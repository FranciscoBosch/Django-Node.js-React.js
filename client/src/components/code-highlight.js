import React, {Component} from 'react';
import './pygments.css';



class CodeHighlight extends Component{
  constructor(props){
    super(props);

    this.state = {
      code : this.props.code,
      language : this.props.language,
      highlighted_code : 'default_code',
      languages : this.props.languages
    }
    this.handleChange = this.handleChange.bind(this);
    this.findLanguage = this.findLanguage.bind(this);

  }

  findLanguage(name){
    for (var i=0; i < this.state.languages.length; i++) {
      if (this.state.languages[i][1] === name){
        return  this.state.languages[i][0];
      }
    }
    return null;

  }

  handleChange(){
    var comments = document.getElementById('comments').checked;
    var index = document.getElementById('selectLanguage').selectedIndex;
    this.setState ({
      language : this.state.languages[index][1]
    });


    if (comments === false) {
      fetch('snippets/highlight/',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            'code': this.state.code,
            'language': this.findLanguage(this.state.language)
          })
      })
        .then(res => res.json()
      )
        .then (res => this.setState({highlighted_code : res})
      )
    } else {
      fetch('snippets/comments/',
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({
            'code': this.state.code,
            'language' : this.findLanguage(this.state.language)
          })
      })
        .then(res => res.json()
      )
        .then (res => this.setState({highlighted_code : res})
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      code: nextProps.code,
      language : nextProps.language,
      languages : nextProps.languages
     });
  }

  componentDidUpdate(){
    var index = -1;
    for (var i=0; i < this.state.languages.length; i++){
      if (this.state.languages[i][1] === this.state.language){
        index = i;
      }
    }
    document.getElementById('selectLanguage').selectedIndex = index;
  }

  render (){
    return(
        <div className='row'>
          <div className='col-sm-12'>
            <h3> Detected Language : {this.state.language} </h3>
            <em>If the detected language is incorrect please select </em>
              <select id="selectLanguage" onChange= {this.handleChange.bind(this)}>
                        { this.state.languages.map(item =>
                              <option value= {item[0]}>{item[1]}</option>
                            )}
                          </select>
            comments : <input id="comments" type="checkbox" onChange= {this.handleChange.bind(this)}/>
            <div align="left"  dangerouslySetInnerHTML={{
                   __html: this.state.highlighted_code
                 }}/>

          </div>
        </div>
      );
  }
}

export default CodeHighlight;
