import Table from 'react-bootstrap/Table';
import talksData from '../content/talks.json';

function TalkTable() {
    return (
        <Table responsive>
            <thead>
                <tr>
                    {talksData.properties.map((property, index) => (
                        <th key={index}>{property}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {talksData.list_of_talks.map((talk, index) => (
                    <tr key={index}>
                        <td>{talk.date}</td>
                        <td>{talk.event_title}</td>
                        <td>{talk.title}</td>
                        <td>{talk.description}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TalkTable;