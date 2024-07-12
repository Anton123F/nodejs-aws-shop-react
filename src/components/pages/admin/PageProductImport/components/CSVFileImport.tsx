import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { getAuthorizationTokenFromLocalStorage } from "~/utils/utils";
import ErrorContext from "~/context/context";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const { setError } = useContext(ErrorContext);
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFile(file);
    }
  };

  const removeFile = () => {
    setFile(undefined);
  };

  const uploadFile = async () => {
    console.log("uploadFile to", url);
    console.log(getAuthorizationTokenFromLocalStorage());

    // Get the presigned URL
    // @ts-ignore
    const headers = getAuthorizationTokenFromLocalStorage();

    try {
      const response = await axios({
        headers: headers ? headers : undefined,
        method: "GET",
        url,
        params: {
          // @ts-ignore
          name: encodeURIComponent(file.name)
        }
      });

      // @ts-ignore
      console.log("File to upload: ", file.name);

      const result = await fetch(response.data.signedUrl, {
        method: "PUT",
        body: file
      });
      console.log("Result: ", result);
      setFile(undefined);

    } catch (error: any) {
      console.log(`==> Error while send a file <==`);
      console.log(error);
      console.log(error.response.data.message);

      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        setError({ errorCode: error.response.status, errorMessage: error.response.data.message });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
