type InitialStateType = typeof initialState
export type FriendType = { id: string, name: string, src: string }

const initialState = {
    friends: [
        {
            id: '1',
            name: 'Ivan',
            src: 'https://n1s1.hsmedia.ru/96/b6/c2/96b6c2d338825cbd890e41b93bc56fef/620x462_1_372fc1e70d48e600d796b0037e8d1a6c@1000x745_0xac120003_19445549371588781538.jpg'
        },
        {
            id: '2',
            name: 'Egor',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-GttVQjPL0JMW7MtVoF-j8uDoSq64ytQig&usqp=CAU'
        },
        {
            id: '3',
            name: 'Igor',
            src: 'https://images11.cosmopolitan.ru/upload/img_cache/e0e/e0e9227eb01de3bcf914f6bee6ad54e3_ce_1897x1264x202x100_cropped_666x444.webp'
        }
    ] as Array<FriendType>
};

const friendsInformationReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default friendsInformationReducer;
