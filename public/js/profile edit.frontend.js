let profileeditfrombox= document.querySelector(".profile-edit-from-box");




let loginUser= async () => {
    let data =  await fetch('/loginuser');
    let user = await data.json();
    console.log(user);

    profileeditfrombox.innerHTML = `
                     <!-- profile banner edit -->
                  <div class="profile-banner-edit-box">
                               
                            <label>
                              <img src="/uploads/${user.profilebanner}" alt="banner">
                              <input type="file" name="profilebanner" style="display: none;">
                            </label>
                    </div>
                     
                    <!-- profile picture edit -->

                    <div class="profile-picture-edit-box">
                        <label>
                            <img src="/uploads/${user.profilePicture}" alt="Dp">
                            <input type="file" name="profilePicture" style="display: none;">
                             <div class="profile-picture-edit-title-showdown">
                                <p>Edits</p>
                             </div>
                        </label>
                        
                    </div>

                    <!-- profile full name edit -->
                  <div class="profile-fullname-edit-box">
                          

                        <div class="input-group">
                          <div>
                            <label for="fastname">Fastname</label>
                            <input type="text" name="fastname" id="fastname" placeholder="Fastname" value="${user.fastname}">
                          </div>
                        </div>
                          <div class="input-group">
                              <div>
                                  <label for="lastname">Lastname</label>
                                  <input type="text" name="lastname" id="lastname" placeholder="Lastname" value="${user.lastname}">
                                </div>
                          </div>
                        
                        <div class="input-group">
                          <label for="username">Username</label>
                          <input type="text" name="username" id="username" placeholder="Username" value="${user.username}">
                        </div>
                        <div class="input-group">
                          <label for="gander">Gander</label>
                          <select name="gander" id="gander" > 
                            <option selected >Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                        <div class="input-group">
                          <label for="username">Email</label>
                          <input type="text" name="email" id="email" placeholder="Email" value="${user.email}" readonly>
                        </div>

                        <!-- profile bio edit -->

                        <div class="input-group">
                            <label for="bio">Bio</label>
                            <textarea name="about" id="about" cols="30" rows="10" placeholder="about" >${user.about}</textarea>
                        </div>

                        <div class="input-group">
                            <label for="website">Website</label>
                            <input type="text" name="website" id="website" placeholder="Website" value="${user.website}" >
                        </div>
                        
                        <div class="input-group">
                            <label for="phone">Phone</label>
                            <input type="text" name="contact" id="contact" placeholder="contact" value="${user.contact}">
                        </div>

                        <div class="input-group">
                            <label for="address">Address</label>
                            <input type="text" name="location" id="location" placeholder="Address" value="${user.Location}">
                        </div>

                        <div class="submit-btn-box-edit">
                            <button class="submit-btn"  type="submit">Save</button>
                        </div>

    
                  </div>

                    
            

    
    
    `;


};
loginUser();  