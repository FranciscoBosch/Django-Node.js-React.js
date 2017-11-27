import React, {Component} from 'react';
import CodeAnalysis from './code-analysis';
import CodeHighlight from './code-highlight';


class xComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      code : 'default_code',
      language: 'Text only',
      languages : []
    };
    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentWillMount(){
    fetch ('snippets/analyse_code')
      .then(res => res.json())
      .then(languages => this.setState({languages}) );
  }

  handleLanguageChange(language){
    this.setState({ language});
  }

  handleCodeChange(code){
    this.setState({code});
  }

  render (){
    return (
      <div className="row">
        <div className='col-sm-6'>
          <CodeAnalysis
            code = {this.state.code}
            language = {this.state.language}
            onCodeChange= {this.handleCodeChange}
            onLanguageChange= {this.handleLanguageChange}
          />
        </div>
        <div  align='left' className='col-sm-6'>
            <CodeHighlight
              code = {this.state.code}
              language = {this.state.language}
              languages = {this.state.languages}
              onCodeChange= {this.handleCodeChange}
              onLanguageChange= {this.handleLanguageChange}
            />
        </div>
      </div>
      )
  }
}
export default xComment;
