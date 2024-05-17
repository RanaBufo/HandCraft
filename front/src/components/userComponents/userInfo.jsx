export default class userInfo extends userInfo{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        }
    }
    componentDidMount(){
        
    fetch('https://localhost:7073/User/OneUserGet?id=6')
    .then(res => res.json())
    .then(
        (result) =>{
            this.setState({
                isLoaded: true,
                items: result
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
    }

    render(){
        const {error, isLoaded, items} = this.state;
        if (error){
            return <p> Error {error.message}</p>;
        }
        else if(!isLoaded){
            return <p>Loading...</p>
        }
        else{
            return(
                <p>{items.name}</p>
            )
                
        }
    }
}