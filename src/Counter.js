import React from 'react'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

function Counter() {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()


    return (
        <div>
            <h2>Counter</h2>
            <div>
                <button onClick={() => dispatch({ type: "INCREMENT" })}>Add</button>
                <span>
                    {count}
                </span>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>Sub</button>
            </div>
        </div>
    )
}





// class Counter extends React.Component {

//     incr = () => {
//         this.props.dispatch({ type: "INCREMENT" })
//     }

//     decr = () => {
//         this.props.dispatch({ type: "DECREMENT" })
//     }
//     render() {
//         return (
//             <div className="counter">
//                 <h2>Counter</h2>
//                 <div>
//                     <button onClick={this.incr}>Add</button>
//                     <span>
//                         {this.props.count}
//                     </span>
//                     <button onClick={this.decr}>Sub</button>
//                 </div>
//             </div>
//         )
//     }
// }

// // get the data you need from store
// const mapStateToProps = (state) => ({
//     count: state.count

// })
// return a function then call it with counter component 
//export default connect(mapStateToProps)(Counter)


export default Counter