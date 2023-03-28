
//  dont have to store in a variable coz only one func can be implicitly returned
const  fetchImages = () => 
fetch("/api/getImages", {
    cache: "no-store",
}).then((res) => res.json());



export default fetchImages