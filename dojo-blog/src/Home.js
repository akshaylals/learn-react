const Home = () => {

    const handleClick = (event) => {
        console.log('Hello, ninjas');
        console.log(event);
    }

    const handleClickAgain = (name, event) => {
        console.log('hello ' + name);
        console.log(event.target);
    }

    return (
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={ handleClick }>Click me</button>
            <button onClick={ (event) => handleClickAgain('mario', event) }>Click me again</button>
        </div>
    );
}
 
export default Home;