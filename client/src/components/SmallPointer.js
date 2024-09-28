const SmallPointer = ({color="red"})=>{
    const backgroundColor = (color === "Online" ? "green" : "red")
    return (
        <div style={{height:"8px",width:'8px',backgroundColor,borderRadius:"50%",marginRight:"2px"}}>
        </div>
)}

export default SmallPointer;