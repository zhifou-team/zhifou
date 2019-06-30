
function insertReadMore() {
    //将查看更多推荐插入最后一个card前面
    let insertDiv = document.querySelector(".useToInsert");
    let readMore = document.createElement("div");
    readMore.className = "page-cards-container";
    let htmlReadMoreHTML;
    htmlReadMoreHTML = `
                <div class="page-card-tips" onclick="getInformation('moreLoad')" style="text-align: center;color: #8590a6;cursor: pointer" id="pageCardMore">
                        <div class="page-card-more">
                            <span>点击查看更多</span>
                            <i class="fa fa-angle-down" aria-hidden="true"></i>
                     </div>
            </div>
            `;
    readMore.innerHTML = htmlReadMoreHTML;
    insertDiv.parentNode.insertBefore(readMore,insertDiv.nextSibling);
    console.log("插入更多推荐成功");
}

function getInformation(type) {

    if (type === "firstLoad"){

        //换头像

        notifyOperation("navBarChange","nav_recommend");

        fetch(
            " http://localhost:5050/answer"
            // baseURL+'/answer/extraction'
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
        }).then( res=>{

            //将左侧移除
            function removeCards(){
                let cards = document.querySelectorAll(".page-cards-container");
                if (cards.length !== 0){
                    for (let i =0; i<cards.length ; i++){
                        cards[i].remove();
                    }
                    // displayThis("block","pageCardMore");
                }
            }
            removeCards();

            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
            insertReadMore();
            //cards插入完成后，显示右侧栏
            document.getElementById("pageRightPart").style.display = "block";

        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });

    } else if (type === "moreLoad"){
        //点击阅读更多之后
        fetch(baseURL+'/answer/extraction').then(response =>{
            if(response.ok){
                console.log("请求问题列表成功！");
                return response.json();
            }
        }).then(res =>{
            let questionList;
            questionList = res.data;
            //对显示数量及数据是否为空进行判断限制
            displayQuestionsToHTML(questionList);
        }).catch(function(e){
            zhiFouAlert("error:" + e);
        });
    }
}

//将导航栏的操作封装起来
function navOperation(type,id) {
    if(type === "displayMyFocus"){

        notifyOperation("navBarChange","nav_focus");

        //点击“我的关注” 移除所有推荐问题
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }

        //判断如果没有关注则插入
        if(true){
            let insertDiv = document.querySelector(".useToInsert");
            let noFocusTip = document.createElement("div");
            noFocusTip.className = "page-cards-container";
            let htmlnoFocusTipHTML;
            htmlnoFocusTipHTML = `
                <div class="page-card-tips" style="text-align: center;color: #8590a6" id="noFocusTip">
                    <div class="page-card-more">
                        <span>您暂时还没有关注，快关注以下推荐内容吧！</span>
                    </div>
                </div>
            `;
            noFocusTip.innerHTML = htmlnoFocusTipHTML;
            insertDiv.parentNode.insertBefore(noFocusTip,insertDiv.nextSibling);
            console.log("插入成功");
        }

    } else if(type === "displayNewQuestions"){

        notifyOperation("navBarChange","nav_questions");

        //点击“最新提问” 移除所有其他
        let cards = document.querySelectorAll(".page-cards-container");
        if(cards.length !== 0){
            for (let i =0; i<cards.length; i++){
                cards[i].remove();
            }
        }
    }
}

//右侧通知栏下方的操作封装起来
function notifyOperation(type,id) {
    if (type === "navBarChange"){
        if (id === "nav_recommend"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_focus").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_focus"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_questions").className = "page-header-nav-under";
        } else if (id === "nav_questions"){
            document.getElementById(id).className = "page-header-nav-press";
            document.getElementById("nav_recommend").className = "page-header-nav-under";
            document.getElementById("nav_focus").className = "page-header-nav-under";
        }
    }
}

