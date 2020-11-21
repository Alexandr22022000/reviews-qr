import DeleteRestoreForm from "../components/DeleteRestoreForm";
import { connect } from "react-redux";
import delForm from "../async-actions/delForm";
import restoreForm from "../async-actions/restoreForm";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    delForm,
    restoreForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRestoreForm);
