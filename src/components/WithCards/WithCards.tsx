import React from 'react'
import { getCardsByFetch } from '../../AC'
import store from '../../store'
import { Spinner } from '../Spinner/Spinner'
import { OneOrMore } from '../../types'

interface IProps {
    children?: OneOrMore<React.ReactNode>
}

interface IState {
    load: boolean
}

class WithCards extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            load: false,
        }
    }

    public componentDidMount() {
        fetch('../../winecardsJSON.json', {
            method: 'GET',
        })
            .then(response => {
                if (response.status !== 200 && response.status !== 304) {
                    return Promise.reject(new Error(response.statusText))
                }
                return Promise.resolve(response)
            })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    store.dispatch(getCardsByFetch(data))
                    this.setState({
                        load: true,
                    })
                }
            })
            .catch(error => {
                console.warn(error)
            })
    }

    public render() {
        return <div>{this.state.load ? this.props.children : <Spinner />}</div>
    }
}

export { WithCards }