
//用于公共复用
function displayQuestionsToHTML(questions) {
    let htmlQuestionsString = '';

    // 数据结构：标题title，用于首页显示的摘要partText,和在看questionStar
    //完整的text，需要在点击阅读全文之后取得。
    questions.forEach(data =>{
        htmlQuestionsString += `
            <div class="page-card">
                <div class="page-card-title">
                    <a href=""><span>${data.questionTitle}</span></a>
                </div>
                <div class="page-card-text">
                    <div style="display: block" id="pageCardExtraction${data.answerId}">
                        <span>${data.answerExtraction}</span>
                        <a onclick="cardOperation('displayAnswer',${data.answerId})" class="page-card-text-button">
                        阅读全文 <i class="fa fa-angle-down" aria-hidden="true"></i> 
                        </a>
                    </div>
                    <div class="page-card-text-pickUp" style="display: none" id="pageCardTextPickUp${data.answerId}">
                        <span id="pageCardDescription${data.answerId}"></span>
                        <div style="padding-top: 10px">
                            <a onclick="cardOperation('pickUpAnswer',${data.answerId})" class="page-card-text-button">
                                收起全文 <i class="fa fa-angle-up" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div class="page-card-bottom">
                    <div class="page-card-bottom-reader" style="display: inline-block" onclick="cardOperation('upQuestionLooking',${data.answerId})" id="upQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-top">
                            <i class="fas fa-book-reader"></i>
                        </div>
                        <span id="isLooking${data.answerId}">在看 ${data.answerStar}</span>
                    </div>
                    <div class="page-card-bottom-reader" style="display: none" onclick="cardOperation('downQuestionLooking',${data.answerId})" id="downQuestionLooking${data.answerId}">
                        <div class="d-inline-block align-top">
                            <i class="fas fa-book-reader"></i>
                        </div>
                        <span id="haveLooked${data.answerId}">已在看 ${data.answerStar}</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('displayComments',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-comment-dots"></i>
                        </div>
                        <span style="display: inline-block" id="downComment${data.answerId}">${data.comment} 条评论</span>
                        <span style="display: none" id="UpComment${data.answerId}">收起评论</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('shareQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-share-square"></i>
                        </div>
                        <span style="display: inline-block" id="shareQuestion${data.answerId}">分享</span>
                        <span style="display: none" id="haveShared${data.answerId}">已分享</span>
                    </div>
                    <div class="page-card-bottom-item" onclick="cardOperation('storeQuestion',${data.answerId})">
                        <div class="d-inline-block align-top">
                            <i class="far fa-star"></i>
                        </div>
                        <span style="display: inline-block" id="storeQuestion${data.answerId}">收藏</span>
                        <span style="display: none" id="haveStored${data.answerId}">已收藏</span>
                    </div>
                </div>
                <div class="page-card-comments-content" style="display: none" id="pageCardComments${data.answerId}">
                    <hr>
                    <div class="page-card-comments" id="pageCardComments"></div>
                </div>
            </div>
            `;
    });

    //将cardColumns插入到useToInsert这个div之前
    let insertDiv = document.querySelector(".useToInsert");
    let cardColumns = document.createElement("div");
    cardColumns.className = "page-cards-container";
    cardColumns.innerHTML = htmlQuestionsString;
    insertDiv.parentNode.insertBefore(cardColumns,insertDiv);
}

function displayThis(type,id) {
    let object = document.getElementById(id);

    if (type === "block"){
        if(object.style.display==="none")
        {
            object.style.display="block";
        }
        else
        {
            object.style.display="none";
        }
    } else if (type === "i-block"){
        if(object.style.display==="none")
        {
            object.style.display="inline-block";
        }
        else
        {
            object.style.display="none";
        }
    }

}

function displayWholeSearch() {


    function displaySearchStyle(){
        let searchPart = document.getElementById("searchPart");
        let hoverStyle = document.getElementById("pageHeaderSearch");

        if(searchPart.style.display === "none"){
            searchPart.style.display = "block";

            hoverStyle.style.color = "#1f8dfb";
            hoverStyle.style.borderTop = "4px solid #1f8dfb";
            hoverStyle.style.borderLeft = "1px solid #eeeeee";
            hoverStyle.style.borderRight = "1px solid #eeeeee";
        }else{
            searchPart.style.display = "none";

            hoverStyle.style.color = "#8590a6";
            hoverStyle.style.borderTop = "4px solid transparent";
            hoverStyle.style.borderLeft = "1px solid transparent";
            hoverStyle.style.borderRight = "1px solid transparent";
        }
    }
    displaySearchStyle();
}

function displayStyle(hidePart,moseoverPart) {
    let searchPart = document.getElementById(hidePart);
    let hoverStyle = document.getElementById(moseoverPart);

    if(searchPart.style.display === "none"){
        searchPart.style.display = "block";

        hoverStyle.style.color = "#1f8dfb";
        hoverStyle.style.borderTop = "4px solid #1f8dfb";
        hoverStyle.style.borderLeft = "1px solid #eeeeee";
        hoverStyle.style.borderRight = "1px solid #eeeeee";
    }else{
        searchPart.style.display = "none";

        hoverStyle.style.color = "#8590a6";
        hoverStyle.style.borderTop = "4px solid transparent";
        hoverStyle.style.borderLeft = "1px solid transparent";
        hoverStyle.style.borderRight = "1px solid transparent";
    }
}