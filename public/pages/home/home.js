

function homePage() {
    $("#data-change").replaceWith(
        `
               <section id="data-change">
                   <div class="sec-design">
                       <form class="form-design">
                           <div style="text-align: center;">כניסת משתמשים:</div>
                            <div style="text-align: center;">
            <button type="submit" id="confirm" onClick="login(1)" class="btn btn-info">כניסת חניך<span class="fa fa-arrow-right"></span></button>
  
            <button type="submit" id="confirm" onClick="login(2)" class="btn btn-info">כניסת מדריך<span class="fa fa-arrow-right"></span></button>
  
            <button type="submit" id="confirm" onClick="login(3)" class="btn btn-info">כניסת מנהל<span class="fa fa-arrow-right"></span></button>

            <button type="submit" id="confirm" onClick="signup()" class="btn btn-info">הרשם<span class="fa fa-arrow-right"></span></button>
            
            <button type="submit" id="confirm" onClick="studLoadMenu()" class="btn btn-info">כניסה ישירה חניך<span class="fa fa-arrow-right"></span></button>

            </div>
                           

                       </form>
                   </div>
               </section>
       `
    );

}