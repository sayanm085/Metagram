
let postboxmiddle=document.querySelector(".main-box-middle")


let allpost= async()=>{
    let response=await fetch("/allposts")
    let data=await response.json()


  data[0].reverse().forEach(element => {
    
      let likevarify = async () => {
      let likedata = await fetch("/loginuser");
      let data = await likedata.json();

      if (element.likes.likedBy.indexOf(data._id) === -1) {
        button.innerHTML=`<i class="fa-regular fa-thumbs-up"></i>
        <p>${element.likes.likesNumber}</p>
        <p>Like</p>`
      } else {
        button.innerHTML=`<i class="fa-regular fa-thumbs-up likevarify"></i>
        <p class="likevarify">${element.likes.likesNumber}</p>
        <p class="likevarify">Like</p>`
      }
    } ;
    likevarify();

    
    // let postopt = () => {
    //   if (element.image === "#") {
    //     img1.style.display = "none";
    //   } else {
    //     img1.src = `/uploads/${element.image}`;
    //     img1.style.display = "block";
    //   }
    // };

    // postopt()



    let mainbox=document.createElement("div")
    mainbox.classList.add("main-post-box")    

   
    let maincenterpostbox=document.createElement("div")
    maincenterpostbox.classList.add("main-center-post-box")
    mainbox.appendChild(maincenterpostbox)

    let mainuploadernamebox=document.createElement("div")
    mainuploadernamebox.classList.add("main-uploader-name-box")
    maincenterpostbox.appendChild(mainuploadernamebox)
  
    // fast part of mainuploadernamebox
    let mainpicnamebox=document.createElement("div")
    mainpicnamebox.classList.add("main-pic-name-box")
    
    let anchormainpicnamebox=document.createElement("a")
    anchormainpicnamebox.href=`/profile/${element.owner._id}`
    anchormainpicnamebox.classList.add("main-pic-name-box-anchor")
    mainpicnamebox.appendChild(anchormainpicnamebox)

    let mainuploaderpic=document.createElement("div")
    mainuploaderpic.classList.add("main-uploader-pic")
    anchormainpicnamebox.appendChild(mainuploaderpic)
    let img=document.createElement("img")
    img.src=`/uploads/1711967051270.jpg`
    mainuploaderpic.appendChild(img)


    let mainuploadername=document.createElement("div")
    mainuploadername.classList.add("main-uploader-name")
    anchormainpicnamebox.appendChild(mainuploadername)
    let h6=document.createElement("h6")
    h6.innerHTML=`${element.owner.fastname} ${element.owner.lastname}`
    let p=document.createElement("p")
    p.innerHTML=`4:30AM 20 Aug`

    mainuploadername.appendChild(h6)
    mainuploadername.appendChild(p)


    mainuploadernamebox.appendChild(mainpicnamebox)

    let mainthreedotbox=document.createElement("div")
    mainthreedotbox.classList.add("main-three-dot-box")
    mainthreedotbox.innerHTML=`<i class="fa-solid fa-ellipsis-vertical"></i>`

    mainuploadernamebox.appendChild(mainthreedotbox)

    // fast part of mainuploadernamebox end


    let maintitlehastagbox=document.createElement("div")
    maintitlehastagbox.classList.add("main-title-hastag-box")


    let p1=document.createElement("p")
    p1.innerHTML=`${element.content}`
    let p2=document.createElement("p")
    p2.style.color="#005eff"
    p2.innerHTML=`${element.hashtag}`

    maintitlehastagbox.appendChild(p1)
    maintitlehastagbox.appendChild(p2)
    maincenterpostbox.appendChild(maintitlehastagbox)


    let mainpostimagevideobox=document.createElement("div")
    mainpostimagevideobox.classList.add("main-post-image-video-box")
    let img1=document.createElement("img")
    img1.src=`/uploads/${element.image}`
    mainpostimagevideobox.appendChild(img1)
    maincenterpostbox.appendChild(mainpostimagevideobox)

    let postopt = () => {
      if (element.image === "#" || element.image === ""||element.image===undefined) {
        img1.src = `#`;
        img1.style.display = "none";
      } else {
        img1.src = `/uploads/${element.image}`;
        img1.style.display = "block";
      }
    };

    postopt()

    let mainlikecomshareetcbox=document.createElement("div")
    mainlikecomshareetcbox.classList.add("main-like-com-share-etc-box")
    maincenterpostbox.appendChild(mainlikecomshareetcbox)

    let mainlikecomshare=document.createElement("div")
    mainlikecomshare.classList.add("main-like-com-share")
    mainlikecomshareetcbox.appendChild(mainlikecomshare)

    let mainlikebox=document.createElement("div")
    mainlikebox.classList.add("main-like-box")
    mainlikecomshare.appendChild(mainlikebox)

    let button=document.createElement("button")
    button.classList.add("main-like-number-box")
    button.innerHTML=`<i class="fa-regular fa-thumbs-up"></i>
    <p>${element.likes.likesNumber}</p>
    <p>Like</p>`
    mainlikebox.appendChild(button)

    let maincommentbox=document.createElement("div")
    maincommentbox.classList.add("main-comment-box","main-like-box")
    mainlikecomshare.appendChild(maincommentbox)
    maincommentbox.innerHTML=`<i class="fa-regular fa-comment"></i>
    <div class="main-comment-number-box main-like-number-box">
      <p>${element.likes.likesNumber}</p>
      <p>Comment</p>
    </div>`

    mainlikebox.appendChild(maincommentbox)

    let mainsharebox=document.createElement("div")
    mainsharebox.classList.add("main-share-box","main-like-box")
    mainlikecomshare.appendChild(mainsharebox)
    mainsharebox.innerHTML=`<i class="fa-solid fa-share-nodes"></i>
    <div class="main-share-number-box main-like-number-box">
      <p></p>
      <p>Share</p>
    </div>`
    mainlikebox.appendChild(mainsharebox)

    let mainsavecontentbox=document.createElement("div")
    mainsavecontentbox.classList.add("main-savecontent-box")
    mainsavecontentbox.innerHTML=`<i class="fa-regular fa-bookmark"></i>`
    mainlikecomshareetcbox.appendChild(mainsavecontentbox)


    let maincommentpostbox=document.createElement("div")
    maincommentpostbox.classList.add("main-comment-post-box")
    maincenterpostbox.appendChild(maincommentpostbox)

    let maincommentuserpicbox=document.createElement("div")
    maincommentuserpicbox.classList.add("main-comment-user-pic-box")
    maincommentpostbox.appendChild(maincommentuserpicbox)
    let anchormaincommentuserpicbox=document.createElement("a")
    anchormaincommentuserpicbox.href=`/profile`
    anchormaincommentuserpicbox.classList.add("main-comment-user-pic-box")
    maincommentuserpicbox.appendChild(anchormaincommentuserpicbox)
    let img2=document.createElement("img")
    img2.src=`/uploads/1711967051270.jpg`
    anchormaincommentuserpicbox.appendChild(img2)

    let maincommentinputbox=document.createElement("div")
    maincommentinputbox.classList.add("main-comment-input-box")
    maincommentpostbox.appendChild(maincommentinputbox)
    let input=document.createElement("input")
    input.type="text"
    input.name="text"
    input.id="text"
    input.placeholder="Write a comment"
    let i=document.createElement("i")
    i.classList.add("fa-regular","fa-face-smile")
    maincommentinputbox.appendChild(input)
    maincommentinputbox.appendChild(i)


    
   

      button.addEventListener("click",()=>{

          let data1 = async()=>{
            let response=await fetch(`/like/${element._id}`)
            let data=await response.json()

            if (data[0].likedBy.indexOf(data[1]) === -1) {
              button.innerHTML=`<i class="fa-regular fa-thumbs-up"></i>
              <p>${data[0].likesNumber}</p>
              <p>Like</p>`
            } 
            else {
              button.innerHTML=`<i class="fa-regular fa-thumbs-up likevarify" ></i>
              <p class="likevarify">${data[0].likesNumber}</p>
              <p class="likevarify">Like</p>`
            }
 
           }
          data1()
        })
    








    



     
        
        
    
       
    postboxmiddle.appendChild(mainbox)

    

    
     

  });
}







allpost()

export default allpost;

