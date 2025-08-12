# local-file-upload-ts

# Three Functions (insertFile, deleteFile, updateFile)

1. insertFile 
  - You will provide a file in return it will provide you a path in this case ('/uploads/${targetYear}/${folderNameYouWant}/${nanoid}')
  - The function will save the file in the uploads folder along with your specific folderName
  - here nanoid is package which generates a nano uuid which is default length is 21
    
2. deleteFile
  - You will provide the pathName you have given during insertFile.
  - Afterwards, it will delete the file from your local storage.
    
3. updateFile
  - You will provide the pathName and also a file.
  - Both insertFile and deleteFile functions is used in this function.

Supporting Packages
  - nanoid (https://www.npmjs.com/package/nanoid)

Library Link
  - local-file-upload (https://www.npmjs.com/package/local-file-upload)
