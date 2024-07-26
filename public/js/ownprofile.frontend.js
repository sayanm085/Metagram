let profilemainshowbox=document.querySelector(".profile-main-show-box")

let profileaboutdatabox=document.querySelector(".profile-about-data-box")

let profileuserallpostbox=document.querySelector(".profile-user-allpost-box")

let usermainprofile= async()=>{
    let response=await fetch("/loginuser")
    let data=await response.json()
    console.log(data)
   
    profilemainshowbox.innerHTML=`
                    <!-- profile user Banner -->
                    <div class="profile-banner">
                        <img src="/uploads/${data.profilebanner}" alt="">
                    </div>
                   <!-- profile user data  -->
                    <div class="profile-user-data-box">
                        <!-- profile-img-username-box -->
                          <div class="profile-img-username-box">
                                <div class="profile-img-box">
                                    <img src="/uploads/${data.profilePicture}" alt="Sayan Mondal">
                                </div>
                                <div class="profile-username-box">
                                    <p class="profile-Fullname">${data.fastname} ${data.lastname}</p>
                                    <p>@${data.username}</p>
                                </div>
                          </div>
                            <!-- profile user post follower media -->
                          <div class="profile-user-post-follower-media-box">
                                <div class="profile-user-post-follower-media">
                                    <div class="profile-user-post-num profile-maindata">
                                        <p>Post</p>
                                        <p class="bold-text">${data.posts.length}</p>
                                    </div>
                                    <div class="profile-user-follower-num profile-maindata">
                                        <p>Follower</p>
                                        <p class="bold-text">${data.followers.length}</p>
                                    </div>
                                    <div class="profule-user-following-num profile-maindata">
                                        <p>Following</p>
                                        <p class="bold-text">${data.following.length}</p>
                                    </div>
                                   
                                </div>
                          </div>
                          <!-- profile user edit button -->
                          <div class="profile-user-edit-story-button">
                            <button class="profile-edit-btn">Profile Edit 
                                <svg class="svg" viewBox="0 0 512 512">
                                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
                              </button>                          
                          </div>      

                    </div>
                
    
    `;
    
    profileaboutdatabox.innerHTML=`
                    <div class="profile-about-title">
                            <p>About Me</p>
                        </div>
                        <div class="profile-about-data">
                            <p>${data.about}</p>
                        </div>
                        <div class="profile-user-info-box">
                            <div class="profile-user-info">
                                <i class="fa-solid fa-location-dot" style="color: #6466ff"></i>
                                <p>${data.Location}</p>
                            </div>
                            <div class="profile-user-info">
                                <i class="fa-brands fa-whatsapp" style="color: rgb(0, 255, 21);"></i>
                                <p>${data.phnumber}</p>
                            </div>
                            <div class="profile-user-info" style="margin-bottom: 15px;">
                                <i class="fa-regular fa-calendar-days" style="color: #003992"></i>
                                <p>Joined</p>
                                <p>August 2021</p>
                            </div>
                     </div>
    `;






    data.posts.reverse().forEach(element => {



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

          
        console.log(element)

    let mainpostbox=document.createElement("div")
    mainpostbox.classList.add("main-post-box")
          
   
    let maincenterpostbox=document.createElement("div")
    maincenterpostbox.classList.add("main-center-post-box")
    mainpostbox.appendChild(maincenterpostbox)

    let mainuploadernamebox=document.createElement("div")
    mainuploadernamebox.classList.add("main-uploader-name-box")
    maincenterpostbox.appendChild(mainuploadernamebox)
  
    // fast part of mainuploadernamebox
    let mainpicnamebox=document.createElement("div")
    mainpicnamebox.classList.add("main-pic-name-box")
    
    let anchormainpicnamebox=document.createElement("a")
    anchormainpicnamebox.href=`/profile/${data._id}`
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
    h6.innerHTML=`${data.fastname} ${data.lastname}`
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



       console.log(element)
     profileuserallpostbox.appendChild(mainpostbox)

    });
   
    

    
}

usermainprofile()





{/* <div class="profile-user-media-num profile-maindata">
<p>Media</p>
<p class="bold-text">6</p>
</div> */}