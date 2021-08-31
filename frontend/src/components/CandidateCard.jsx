export default function CandidateCard({
    votes = 0,
    candidate = null
}) {
    return (
        <div className={`shadow-lg p-4 m-2 w-80 h-48
        flex flex-row items-center justify-center
        font-semibold`}  style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            {/* <img src={`../../img/${candidate.userName}.png`}></img> */}
        </div>
    )
}
