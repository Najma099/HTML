
const promiseone = new Promise(function(resolve,reject){
    setTimeout(function(){
        //console.log("async task is complete");
        resolve();
    },1000)
});  

promiseone.then(function(){
    //console.log("Promise complete");
})


new Promise(function(resolve,reject){
    setTimeout(function(){
        //console.log("Async task 2");
        resolve();
    },1000)
}).then(function(){
    //console.log("Async 2")
})


const promiseThree = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve({
            username:'Chai',
            email:"Chai@example"
        })
    },1000)
})

promiseThree.then(function(user){
    //console.log(user);
})

const promisefour = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error = false;
        if(!error){
            resolve({
                username:'HELLLOOO',
                email:"Chaijjjj2gmail.com"
            })
        }
        else {
            reject("Errorrr");
        }
    },1000)
})

promisefour
.then((user) => {
    //console.log(user);
    return user.username;
})
.then( (username) => {
   //console.log(username);
})
.catch(function(error){
    //console.log(error);
})
.finally( () =>{
    //console.log("The promise is either resolved or rejected")


}

)

const promiseFive = new Promise(function(resolve,reject){
    setTimeout(function(){
        let error = true;
        if(!error){
            resolve({
                username:'JS',
                password: "123"
            })
        }
        else {
            reject("Errorrr: JS went wrong");
        }
    },1000)
});
async function consumePromisefive(){
    try{
        const response = await promiseFive
        //console.log(response);
    }catch(error){
        //console.log(error);
    }
}
consumePromisefive();


async function getallUser() {
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        //console.log(data);
    }
    catch(error){
        //console.log("E: ",error);
    }
}
getallUser()

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) =>{
        console.log(error);
    })
