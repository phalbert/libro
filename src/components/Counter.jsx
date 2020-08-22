import { defineComponent } from 'vue';
import useCounter from '../hooks/useCounter';

const Counter = defineComponent({
    setup() {
        return {
            ...useCounter()
        }
    },
    render() {
        return (
            <div>
                <button onClick={this.increment}>increment</button>
                <span>Count: {this.count}</span>
            </div>
        )
    }
})

export default Counter