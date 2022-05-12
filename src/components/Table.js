import React from 'react'
import numeral from 'numeral'
import styled from 'styled-components'

const TableWrapper = styled.div`

    margin-top: 20px;
    overflow-y: scroll;
    height: 400px;
    color: green;


 tr{
    display: flex;
    justify-content: space-between;
}

 td{
    padding: 0.5rem;
}

 tr:nth-of-type(odd) {
    background-color: pink;
}
`

const Table = ({ countries }) => {
    return (
        <TableWrapper>
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{country}</td>
                    <td><strong>{numeral(cases).format("0,0")}</strong></td>
                </tr>
            ))}
        </TableWrapper>
    )
}

export default Table
