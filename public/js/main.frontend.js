let closepostbox=document.querySelector(".close-createpost")
let openpostbox=document.querySelectorAll(".open-post-box")
let Hashtagpostbox=document.querySelector(".Hashtag-post-box")

import usermainprofile from "./usermainprofile.frontend.js"
import allpost from "./allpost.frontend.js"



    closepostbox.addEventListener("click",()=>{
        document.querySelector(".main-createpost-box").style.display="none"
    })

    Hashtagpostbox.addEventListener("click",()=>{   
        document.querySelector(".hashtag-input-box").style.display="flex"

    })


    openpostbox.forEach((item)=>{
        item.addEventListener("click",()=>{
            document.querySelector(".main-createpost-box").style.display="flex"
        })
    })




