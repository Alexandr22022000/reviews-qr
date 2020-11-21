import CreateForm from "../components/CreateForm";
import { connect } from "react-redux";
import addForm from "../async-actions/addForm";
import setActiveFormId from "../actions/setActiveFormId";

const mapStateToProps = (state) => ({
    formId: state.forms.activeFormId,
    companyId: state.companies.activeCompanyId,
});

const mapDispatchToProps = {
    addForm,
    setActiveFormId,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
