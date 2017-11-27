import React, {Component} from 'react';


class CodeAnalysis extends Component {
  constructor(props){
    super(props);
    this.state = {
      code : this.props.code,
      language : this.props.language
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(){
    var code = document.getElementById('code').value;
    this.setState(
      { code }
    );
    fetch("/snippets/analyse_code/",
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({'code': code})
    })
    .then(res => res.json())
    .then(language =>
        {
          this.setState({ language });
          this.props.onLanguageChange(this.state.language);
        }
      );
    this.props.onCodeChange(code);
  }

  render (){
    return (
      <div className="row">
        <div align='left' className="col-sm-12">
          <input id="analysis" value= "Analysis" type="button" onClick= {this.handleChange.bind(this)}/>
          <label align='left'>Please paste your code and press analysis button</label>
          <textarea className="form-control" rows="15" id="code"></textarea>
        </div>
      </div>
    );
  }
}
export default CodeAnalysis;
