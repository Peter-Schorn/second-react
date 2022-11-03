import React from "react";

class Store extends React.Component {

    constructor(props) {
        super(props);
        this.state = { json: null };
    }

    componentDidMount() {
        const path = `${process.env.PUBLIC_URL}/json_data.json`;
        fetch(path)
            .then((response) => response.json())
            .then((json) => {
                if (json) {
                    this.setState({ json: json });
                    // console.log(this.state);
                }
                else {
                    // console.log("json was falsy");
                }
            });
    }

    render() {

        const json = this.state.json;
        // const json = null;

        let tableData;
        if (json) {

            tableData = [
                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Category
                        </th>
                        <th>
                            Stocked
                        </th>
                    </tr>
                </thead>
            ];

            for (let i = 1; i < json.length; i++) {
                // console.log(json[i].stocked);
                const stockedString = json[i].stocked ? "✔︎" :
                    <strong>X</strong>;
                tableData.push(
                    <tr>
                        <td>{json[i].name}</td>
                        <td>{json[i].price}</td>
                        <td>{json[i].category}</td>
                        <td>{stockedString}</td>
                    </tr>
                );
            }

        }
        else {
            tableData = <thead><tr>No data</tr></thead>;
        }

        return (
            <div class="store">
                <table>
                    {tableData}
                </table>
            </div>
        );
    }

}

export default Store;
