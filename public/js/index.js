const searchBar = document.querySelector("[name=searchbar]")
// console.log(searchBar)
searchBar.addEventListener("input", e => {
    const text = e.target.value.toLowerCase();
    const itemList = Array.from(document.querySelector("#list").children);

    // console.log(Array.from(itemList));

    itemList.forEach(item => {
        let name = item.querySelector(".card-title").textContent;
        
        let isVisible = name.toLowerCase().includes(text);
        console.log(text);
        console.log(`${name} = ${isVisible}`);

        item.classList.toggle("hide", !isVisible);
    });

});