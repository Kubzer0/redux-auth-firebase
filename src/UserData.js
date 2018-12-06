import React from 'react'
import { connect } from 'react-redux'
import { inputChangeAction, saveTextToDbAsyncAction } from './state/userData'
import { TextField } from 'material-ui'
import { RaisedButton } from 'material-ui'

const UserData = (props) => {
    return (
        <div>
            <TextField
                value={props._text}
                onChange={props._inputChangeAction}
            />
            <RaisedButton
                label='save'
                onClick={props._saveTextToDbAsyncAction}
            />


        </div>
    )
}

const mapStateToProps = state => ({
    _text: state.userData.text
})
const mapDispatchToProps = dispatch => ({
    _inputChangeAction: (event) => dispatch(inputChangeAction(event.target.value)),
    _saveTextToDbAsyncAction: () => dispatch(saveTextToDbAsyncAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserData)