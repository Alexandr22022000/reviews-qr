var React = require('react');
var PrintTemplate = require ('react-print');
var QRCode = require('qrcode.react');

class MyTemplate extends React.Component {
    render() {
        return (
            <PrintTemplate>
                <div>
                    <h3>All markup for showing on print</h3>
                    <p>Write all of your "HTML" (really JSX) that you want to show
                        on print, in here</p>
                    <p>If you need to show different data, you could grab that data
                        via AJAX on componentWill/DidMount or pass it in as props</p>
                    <p>The CSS will hide the original content and show what is in your
                        Print Template.</p>

                    <QRCode value="https://neuronex.pro" />
                </div>
            </PrintTemplate>
        )
    }

    componentWillMount () {
        window.print();
    }
}

export default MyTemplate;