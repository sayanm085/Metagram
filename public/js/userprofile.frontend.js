let  userid = document.querySelector('.userid').innerText;


let profilemainshowbox=document.querySelector(".profile-main-show-box");

let profileaboutdatabox=document.querySelector(".profile-about-data-box");

let profileuserallpostbox=document.querySelector(".profile-user-allpost-box");

let userdata = async()=>{
 let res = await fetch(`/userprofile/${userid}`);
 let data = await res.json();
 console.log(data);

 let profilebanner=document.createElement("div")
  profilebanner.classList.add("profile-banner")
  profilebanner.innerHTML=`<img src="/uploads/${data.profilebanner}" alt="profile banner">`

  let profileuserdatabox=document.createElement("div")
  profileuserdatabox.classList.add("profile-user-data-box")

  let profileimgusernamebox=document.createElement("div")
  profileimgusernamebox.classList.add("profile-img-username-box")
  profileimgusernamebox.innerHTML=`
        <div class="profile-img-box">
                <img src="/uploads/${data.profilePicture}" alt="Sayan Mondal">
            </div>
            <div class="profile-username-box">
                <p class="profile-Fullname">${data.fastname} ${data.lastname}</p>
                <p>@${data.username}</p>
        </div>
  `

  let profileuserpostfollowermediabox=document.createElement("div")
  profileuserpostfollowermediabox.classList.add("profile-user-post-follower-media-box")
 
  let profileuserpostfollowermedia=document.createElement("div");
  profileuserpostfollowermedia.classList.add("profile-user-post-follower-media");


  let profileuserpostnumprofilemaindata=document.createElement("div");
  profileuserpostnumprofilemaindata.classList.add("profile-user-post-num","profile-maindata");
  profileuserpostnumprofilemaindata.innerHTML=`<p>Post</p>
                  <p class="bold-text">${data.posts.length}</p>`
  profileuserpostfollowermedia.appendChild(profileuserpostnumprofilemaindata)

  let profileuserfollowernumprofilemaindata=document.createElement("div");
  profileuserfollowernumprofilemaindata.classList.add("profile-user-follower-num","profile-maindata");
  profileuserfollowernumprofilemaindata.innerHTML=`<p>Follower</p>
                  <p class="bold-text">${data.followers.followerNumber}</p>`

  profileuserpostfollowermedia.appendChild(profileuserfollowernumprofilemaindata)

  let profuleuserfollowingnumprofilemaindata=document.createElement("div");
  profuleuserfollowingnumprofilemaindata.classList.add("profule-user-following-num","profile-maindata");
  profuleuserfollowingnumprofilemaindata.innerHTML=`<p>Following</p>
                  <p class="bold-text">${data.following.followingNumber}</p>`
  profileuserpostfollowermedia.appendChild(profuleuserfollowingnumprofilemaindata)


  
  let followervalify = async () => {
    let likedata = await fetch("/loginuser");
    let logindata = await likedata.json();


    if (data.followers.followerBy.indexOf(logindata._id) === -1) {
      button.innerHTML=`Follow`
      console.log("not following");
    } else {
      button.style.backgroundColor = "transparent";
      button.style.color = "black";
      button.style.border = "2px solid black";
      button.innerHTML=`Following`
      console.log("following");
    }
    
  }
  followervalify();



 let profileusereditstorybutton=document.createElement("div")
  profileusereditstorybutton.classList.add("profile-user-edit-story-button")


  let button = document.createElement("button");
  button.classList.add("button");
  button.innerHTML = `Follow`;
  
  button.addEventListener("click", async () => {
    try {
      let data1 = async () => {
        let userdata = data._id; // Assuming 'data' is defined elsewhere
        let response = await fetch(`/follow/${userdata}`);
        let response_data = await response.json(); // Use a different variable name

        //* Assuming 'data' is defined elsewhere

        if (response_data.followers.followerBy.indexOf(response_data.user) === -1) { // Assuming 'data' is defined elsewhere
             profileuserfollowernumprofilemaindata.innerHTML=`<p>Follower</p>
                  <p class="bold-text">${response_data.followers.followerNumber}</p>`

                   profuleuserfollowingnumprofilemaindata.innerHTML=`<p>Following</p>
                  <p class="bold-text">${response_data.following.followingNumber}</p>`
                 button.innerHTML=`Follow`;
             console.log("not following");
        } else {
             profileuserfollowernumprofilemaindata.innerHTML=`<p>Follower</p>
                  <p class="bold-text">${response_data.followers.followerNumber}</p>`

                   profuleuserfollowingnumprofilemaindata.innerHTML=`<p>Following</p>
                  <p class="bold-text">${response_data.following.followingNumber}</p>`
                  button.style.backgroundColor = "transparent";
                  button.style.color = "black";
                  button.style.border = "2px solid black";
                  button.innerHTML=`Following`;

          console.log("following");
        }
      };
      data1();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  



  
  profilemainshowbox.appendChild(profilebanner)
  profilemainshowbox.appendChild(profileuserdatabox)
  profileuserdatabox.appendChild(profileimgusernamebox)
  profileuserdatabox.appendChild(profileuserpostfollowermediabox)
  profileuserpostfollowermediabox.appendChild(profileuserpostfollowermedia)
  
  profileuserdatabox.appendChild(profileusereditstorybutton)
  profileusereditstorybutton.appendChild(button)












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
      console.log(data);
     }
    data1()
  })



   console.log(element)
 profileuserallpostbox.appendChild(mainpostbox)

});








}
userdata();

