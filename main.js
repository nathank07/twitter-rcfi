let hoveredDiv

window.addEventListener("mouseover", (e) => hoveredDiv = e.target)

window.oncontextmenu = function (e) {
    const tweet = seekParentTweet(hoveredDiv)
    console.log(tweet)
    if(tweet && findInteractions(tweet)){
        const interactions = findInteractions(tweet)
        interactions.forEach(interaction => {
            if(interaction.contains(hoveredDiv)){
                const label = interaction.firstChild.attributes["aria-label"].value
                e.preventDefault()
                tweet.click()
                if(label.includes("Like")){
                    location.href = location.href + "/likes"
                }
                if(label.includes("Repost")){
                    location.href = location.href + "/retweets"
                }
                if(label.includes("Reply")){
                    location.href = location.href + "/quotes"
                }
                
                console.log(interaction)
                console.log(label)
            }
        });
    }
}


function seekParentTweet(div){
    if(div.parentElement === null || div.parentElement === undefined){
        return false
    }
    if(div.parentElement.tagName === "ARTICLE"){
        return div.parentElement
    }
    return seekParentTweet(div.parentElement)
}

function findInteractions(tweet){
    let interactionBar
    if(tweet.querySelector(".css-1dbjc4n.r-1kbdv8c.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-hzcoqn")){ 
        interactionBar = tweet.querySelector(".css-1dbjc4n.r-1kbdv8c.r-18u37iz.r-1wtj0ep.r-1s2bzr4.r-hzcoqn") //if tweet is unfocused
    } else { //if tweet is focused (if it isn't a tweet function will not return anything)
        interactionBar = tweet.querySelector(".css-1dbjc4n.r-1oszu61.r-1igl3o0.r-rull8r.r-qklmqi.r-2sztyj.r-1efd50x.r-5kkj8d.r-1kbdv8c.r-18u37iz.r-h3s6tt.r-1wtj0ep.r-3qxfft.r-s1qlax")
    }
    if(interactionBar){
        return Array.from(interactionBar.children).slice(0, 3)
    }
    return false
}