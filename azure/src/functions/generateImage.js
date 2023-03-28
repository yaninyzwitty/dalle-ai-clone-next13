const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");
const { BlobServiceClient } = require("@azure/storage-blob");
const accountName = process.env.accountName;
const containerName = "images";

app.http('generateImage', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        const { prompt } = await request.json();

        console.log(`The prompt is ${prompt}`);

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024",

            
        });
        image_url = response.data.data[0].url;
        // download image
        // using buffer

        const res = await axios.get(image_url, { responseType: 'arraybuffer' }); //download the image
        const arraybuffer = res.data; //ge the image
        // connect to blob instance 
        sasToken = await generateSASToken();
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net?${sasToken}`
          );
          const containerClient = blobServiceClient.getContainerClient(containerName);
       // generate current timestamp
       const timestamp = new Date().getTime();
       const file_name = `${prompt}_${timestamp}.png`;
       const blockblobClient = containerClient.getBlockBlobClient(file_name);

       try {
        await blockblobClient.uploadData(arraybuffer);
        console.log("file upload succesfully");

        
       } catch (error) {
        console.log("Error uploading file", error.message)
        
       };
       return { body: "Succesfully uploaded the image"};







    }
})