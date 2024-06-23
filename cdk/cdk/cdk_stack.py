from aws_cdk import (
    Stack,
    RemovalPolicy,
    aws_s3 as s3,
    aws_iam as iam,
    aws_cloudfront as cloudfront,
    aws_s3_deployment as s3deploy,
)

from constructs import Construct
# 01:07:14 youtube time when config can be found
class CdkStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cloudfront_oia = cloudfront.OriginAccessIdentity(self, "JSCC-OAI")

        bucket = s3.Bucket(self, 'rs-module-anthony-backet',
            bucket_name='rs-module-anthony-backet-s3',
            website_index_document='index.html',
            public_read_access=False,
            block_public_access=s3.BlockPublicAccess.BLOCK_ALL,
            auto_delete_objects=True,
            removal_policy=RemovalPolicy.DESTROY
        )

        bucket.add_to_resource_policy(iam.PolicyStatement(
            actions=["s3:GetObject"],
            resources=[bucket.arn_for_objects("*")],
            principals=[iam.CanonicalUserPrincipal(cloudfront_oia.cloud_front_origin_access_identity_s3_canonical_user_id)]
        ))

        distribution = cloudfront.CloudFrontWebDistribution(self, "JSCC-distribution",
            default_root_object="index.html",
            origin_configs=[
                cloudfront.SourceConfiguration(
                    s3_origin_source=cloudfront.S3OriginConfig(
                        s3_bucket_source=bucket,
                        origin_access_identity=cloudfront_oia
                    ),
                    behaviors=[cloudfront.Behavior(is_default_behavior=True)]
                )
            ]
        )

        s3deploy.BucketDeployment(self, "JSCC-Bucket-Deployment",
            sources=[s3deploy.Source.asset('../dist')],
            destination_bucket=bucket,
            distribution=distribution,
            distribution_paths=["/*"]
        )
