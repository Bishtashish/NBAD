//   check if there is a folder "myFiles" if not create a folder named "myFiles" output "folder is created" otherwise output "folder exist already"
// write your First Name: Last Name: Hobbies in a file "intro.txt"



const fs = require('fs');



if(!fs.existsSync('./myFiles') ){

fs.mkdir('./myFiles', (err)=>{
    if(err) console.log(err)
    else console.log("Folder is created")
});

fs.writeFile('./myFiles/intro.txt', ' First Name: Ashish \n Last Name: Bisht \n Hobbies: Hiking, Running, Football', ()=>{
    console.log('File was written ')
})

}
else console.log("Folder exist already")