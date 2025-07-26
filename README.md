# local-file-upload-ts

# Three Functions (insertFile, deleteFile, updateFile)

insertFile 
  - you will provide a file in return it will provide you a path in this case ('/uploads/${targetYear}/${folderNameYouWant}/${nanoid}')
  - the function will save the file in the uploads folder along with your specific folderName
  - here nanoid is package which generates a nano uuid which is default length is 21
deleteFile
  - you will provide the pathName you have given during insertFile.
  - afterwards, it will delete the file from your local storage
updateFile
  - you will provide the pathName and also a file.
  - Both insertFile and deleteFile functions is used in this function
