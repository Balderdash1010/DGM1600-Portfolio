import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.senators')
const seniorityHeading = document.querySelector('.seniority')
const missedVotesOrderedList = document.querySelector('.missedVotes')

function simplifiedMembers(chamberFilter) {
    const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : 
    member)
    return filteredArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: +senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
        }
    })
}

populateSenatorDiv(simplifiedMembers())

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figCaption')

        figImg.src = senator.imgURL

        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
     })
}

const mostSeniorMember = simplifiedMembers().reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? acc : senator
})

seniorityHeading.textContent = `The most senior member of Congress is ${mostSeniorMember.name}`

const mostLoyal = simplifiedMembers().reduce((acc, senator) => {
    if(senator.loyaltyPct === 100) {
        acc.push(senator)
    }
    return acc
}, [])

const highestMissedVotes = simplifiedMembers().reduce((acc, senator) =>
(acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator, {})

const highestMissedVoters = simplifiedMembers().filter(senator => senator.missedVotesPct >=
50)

highestMissedVoters.forEach(missedVotes => {
    let listItem = document.createElement('li')
    listItem.textContent = missedVotes.name
    missedVotesOrderedList.appendChild(listItem)
})

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

const biggestVacationerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join()
