import { get,writable } from 'svelte/store';

export const apiData = writable({});

const current = writable(-1)

function addOrUpdate(update,node){
    update(nodes=>{
        const idx=nodes.findIndex(x=>x.id===node.id)
        if(idx>-1){
            nodes[idx]=node
        } else {
            nodes=[...nodes,node]
        }
        localStorage.setItem("serversData",JSON.stringify(nodes))
        return nodes
    })
}
function removeNode(update,id){
    let newArray=null
    update(servers=>{
        newArray=servers.filter(x=>x.id!==id)
        localStorage.setItem("serversData",JSON.stringify(newArray))
        return newArray
    })
}
function getCurrent(){
    let servers=get(Nodes)
    let currentId=get(current)
    return servers.find(x=>x.id===currentId)
}
function setCurrent(id){
    let servers=get(Nodes)
    let idx=servers.findIndex(x=>x.id===id)
    if (idx>-1) current.set(id)
}
function getById(id){
    let servers=get(Nodes)
    return servers.find(x=>x.id===id)
}
function createNodes(){
    const serversData=localStorage.getItem("serversData")
    let lst=serversData ? JSON.parse(serversData): []
    const { subscribe, set, update } = writable(lst)
    if(lst.length>0)current.set(lst[0].id)
    return {
		subscribe,
        remove: (/** @type {number} */ id) => removeNode(update,id),
        addOrUpdate: (node) => addOrUpdate(update,node),
        getCurrent: () =>getCurrent(),
        setCurrent: (nodeId)=> setCurrent(nodeId),
        getById: (id)=>getById(id),
        current: current.subscribe
	}
}
export const Nodes = createNodes();