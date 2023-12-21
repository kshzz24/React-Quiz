function Progress({index, nums, points, answer}) {
    return (
        <header className="progress">
            <progress max ={nums} value = {index + Number(answer!==null)} />
            <p>Question <strong>{index+1}</strong> / {nums} </p>
            <p><strong>{points}</strong> / 280</p>
        </header>
    )
}

export default Progress
