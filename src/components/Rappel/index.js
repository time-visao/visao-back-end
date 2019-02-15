import React, { Component } from 'react';
import '../../App.css';
import { Button, Row, Col, Card, Icon, notification, AutoComplete, Steps } from 'antd';
import Loading from '../Loading';
const Step = Steps.Step;
class Rappel extends Component {
  state = {
    loading: true,
    step : 0,
  };
  componentDidMount = async () => {
    await fetch('http://localhost:8000/fornecedores_total')
      .then(res => res.json())
      .then(res => this.setState({ fornecedores: res.data.rows }))
      .catch(err => console.error(err));
    this.setState({ loading: false });
  };




  handleSelectList = async cnpj => {
    await this.setState({ selected: cnpj });
    await this.props.fetchFornecedor(this.state.selected);
    this.setState({ isLoadedFornecedor: true });
    // console.log(this.props.rappel.fornecedor);
  };

  formatMoney(amount, decimalCount = 2, decimal = ",", thousands = ".") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };


  render() {
    return (
      this.state.loading ? (
        <Loading />
      ) : (
      <div>
        <Steps current={this.state.step}>
              <Step title="Faixa 1" description={`Até R$ ${this.formatMoney(1)}`} />
              <Step
                title="Faixa 2"
                description={`De R$ ${this.formatMoney(2)} até R$ ${this.formatMoney(3)}`}
              />
              <Step title="Faixa 3" description={`A partir de R$ ${this.formatMoney(4)}`} />
        </Steps>

         <Row>
          <AutoComplete
            style={{ width: 320 }}
            dataSource={this.state.dataSource}
            onSelect={this.handleSelectAutoComplete}
            onSearch={input => this.handleSearch(input)}
            placeholder="Código fornecedor"
          />
        </Row>
      </div>
      )
    );
  }
}

export default (Rappel);
