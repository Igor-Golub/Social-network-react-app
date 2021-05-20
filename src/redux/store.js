import dialogReducer from "./dialogReducer";
import profileReducer from "./profile-Reducer";
import friendsInformationReducer from "./friendsInformationReducer";

const store = {

    _state: {
        dialogPage: {
            dialogs: [
                {id: '1', name: 'Dimych'},
                {id: '2', name: 'Sveta'},
                {id: '3', name: 'Victor'},
                {id: '4', name: 'Lisua'},
                {id: '5', name: 'Valera'},
                {id: '6', name: 'Vlad'}
            ],
            messages: [
                {id: '1', message: 'Hi!'},
                {id: '2', message: 'How are you?'},
                {id: '3', message: 'What about looking for new job?'},
                {id: '4', message: 'Hi gues!'},
                {id: '5', message: 'Good buy'},
                {id: '6', message: 'Hi!'}
            ],
            newTextMessage: ''
        },
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, I am a good junior react developer!', likes: '15 like'},
                {id: '2', message: 'Oh, it is really cool, because we find good react developer!', likes: '4 like'},
                {id: '3', message: 'Good!!', likes: '0 like'},
                {id: '4', message: 'Badi for everybady!', likes: '100 like'}
            ],
            newPostText: ''
        },
        friendsInformation:
            {
                friends: [
                    {
                        id: '1',
                        name: 'Ivan',
                        src: 'https://7kazan.prokazan.ru/userfiles/picoriginal/img-20141114154149-591.jpg'
                    },
                    {
                        id: '2',
                        name: 'Egor',
                        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-GttVQjPL0JMW7MtVoF-j8uDoSq64ytQig&usqp=CAU'
                    },
                    {
                        id: '3',
                        name: 'Igor',
                        src: 'https://7kazan.prokazan.ru/userfiles/picoriginal/img-20141114154151-959.jpg'
                    }
                ]
            }
    },
    _callSubscriber() {
        console.log('state changed')
    },


    getState() {
        return this._state;
    },
    subscriber(obseruer) {
        this._callSubscriber = obseruer;
    },

    dispatch(action) {

        this._state.dialogPage = dialogReducer(this._state.dialogPage, action)
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.friendsInformation = friendsInformationReducer(this._state.friendsInformation, action)

        this._callSubscriber(this._state);
    }
};

export default store;
window.store = store;