// Purpose: To display the main profile of the user.
let mainprofilebox=document.querySelector(".main-profile-box")

let usermainprofile= async()=>{
    let response=await fetch("/loginuser")
    let data=await response.json()
    console.log(data)
   
    let profilecenterbox=document.createElement("div")
    profilecenterbox.classList.add("center-box")
    profilecenterbox.innerHTML=`
                  <div class="pic-username">
                  <a href="/profile/${data._id}" class="pic-username">
                        <div class="profile-pic-box">
                          <img src="/uploads/${data.profilePicture}" alt=""> 
                        </div>
                        <div class="user-fullname-box">
                            <p class="fullname">${data.fastname} ${data.lastname}</p>
                            <p class="username">@${data.username}</p>
                        </div>
                    </a>
                    </div>
                     <!-- part 2 -->
                    <div class="main-flower-post-box">
                        <div class="flower-box center">
                            <p class="bold-text">${data.followers.length}</p>
                            <p class="slim-text">Followers</p>
                        </div> 
                        <div class="following-box center ">
                            <p class="bold-text">${data.following.length}</p>
                            <p class="slim-text">Following</p>
                            
                        </div>
                        <div class="post-box center">
                            <p class="bold-text">${data.posts.length}</p>
                            <p class="slim-text">Posts</p>
                        </div>
                    </div>
    `
    mainprofilebox.appendChild(profilecenterbox)

}


usermainprofile()

export default usermainprofile;