
//  dont have to store in a variable coz only one func can be implicitly returned
 const  fetchSuggestion = () => 
    fetch("/api/suggestion", {
        cache: "no-store",
    }).then((res) => res.json());
    


export default fetchSuggestion