fetch("https://www.liveeatlearn.com/types-of-nuts/").then(async (res) => {
    const text = await res.text();

    let re = /h3\sclass="wp\-block\-heading"\s.*?>(.*?)<\/h3>\s.*?srcset="(.*?)\s.*?,.*?".*?\/figure>\s<p>(.*?|\s*?)((.|\s)*?)<\/p>\s<h3\sclass="wp/gm

    const matches = text.matchAll(re);

    let nuts = [];
    for (const match of matches) {
        nuts.push({
            name: match[1],
            image: match[2],
            desc: match[4].replace("\n", "").replace("</p>", "").replace("<p>", "")
        });
    }

    // console.log(nuts);
    const fs = require('node:fs');
    fs.writeFile('nuts.json', JSON.stringify(nuts), err => {
        if (err) {
            console.error(err);
        } else {
            // file written successfully
        }
    });

}).catch((err) => {
    console.log(err);
});
