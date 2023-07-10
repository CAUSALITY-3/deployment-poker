const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const port = process.env.PORT || 9000;

const users=[]
const data =[]
let a=0

io.on('connection', socket => {
    console.log(socket.id);
    socket.on('joinpage',name=>{
        const nameexist = users.find(user=>user.name===name)
        if (!nameexist){
            let user={id:socket.id,name,value:'',mode:false}
            socket.emit('userdata', user)
            users.push(user)
            io.emit('usersdata',users)
        }
        else{
            io.emit('nameAlready',name)
        }
    })
    socket.on('estimation',data=>{
        let estUser = users.find((user)=>user.name===data.name)
        console.log("|||||||||||||||")
        console.log(estUser, data)
        
        if (estUser){
        estUser.value=data.value
        console.log(users)
        io.emit('usersdata',users)
        }
    })  
    socket.on('disconnect', async () => {
        console.log('cccccc',users)
        console.log("bbb",socket.id)
        const removeUser = await users.find((user)=>user.id===socket.id)
        console.log('fff',removeUser)
        
        if(removeUser){
            const index = users.indexOf(removeUser);
            if (index > -1) {
                users.splice(index, 1);
              }
        }
        console.log('dddddd',users)

        await io.emit('usersdata',users)
    })  
})

server.listen(port, () => {
    console.log(`server is up on port ${port}!`)
})



// socket.on('message', ({name, message}) => {
//     //     io.emit('message', ({name, message}))
//     // })
//     var clientIp = socket.request.connection.remoteAddress;

//   console.log(clientIp);
//     // console.log("user-agent: ",socket.request.headers['user-agent']);
//     data.push({id:socket.id,num:a})
//     a=a+1
//     io.emit('prof', data )

//     socket.on('cha',id=>{
//        let yy= data.filter((item)=>{item.id==id})
//        data.pop(yy[0])
//        yy[0].num=100
//        data.push(yy[0])
//        io.emit('prof', data )
//     })
//     socket.on('hai',data=>{
//         io.emit("hello",data)
//     })

//     users.push(socket.id)
//     io.emit('users',users)
//     // console.log(socket.id)
//     socket.on('message', (mess) => {
//         socket.emit("test","hello",socket.id)
//         io.emit('mess', mess=mess+1)
        
//     })
//     socket.on('disconnect', (socket) => {
//         users.pop(socket.id)
//         lis=data.filter((item)=> item.id==socket.id)
//         data.pop(lis[0])

//         io.emit('users', users)
//         io.emit('prof', data )
//     })