import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Button, Row, Col, Card, Icon, notification, AutoComplete, Steps } from 'antd';
import Loading from '../Loading';
const Step = Steps.Step;
class Rappel extends Component {
  state = {
    fornecedores : '',
    dataSource : '',
    loading: true,
    step : 0,
    limite_1 : '',
    limite_2 : '',
    limite_3 : '',
    limite_4 : '',
    selectedCNPJ : '',
    selectedNome : '',
    compras : '',
    taxa_antecipacao : '',
    taxa_alcancada : '',
    rappel_total : '',
    rappel_antecipado : '',
    parcela_rappel : '',
    payment_enabled : false,
  };
  componentDidMount = async () => {
    await fetch('http://localhost:8000/fornecedores_total')
      .then(res => res.json())
      .then(res => this.setState({ fornecedores: res.data.rows }))
      .catch(err => console.error(err));
    this.setState({ loading: false });
    
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

  handleSearch = async input => {
    let data = [];
    for (let i = 0; i < this.state.fornecedores.length; i++) {
      if (this.state.fornecedores[i].cnpj.includes(input)) {
        data.push(this.state.fornecedores[i].cnpj);
      }
    }
    await this.setState({ dataSource: data });
  };

  handleCalculateRappel = () => {
    let rappel_t = parseFloat(this.state.taxa_alcancada)/100 * parseFloat(this.state.compras);
    let rappel_antecipado = rappel_t * (parseFloat(this.state.taxa_antecipacao)/100);
    let parcela_rappel = rappel_antecipado / 12;
    this.setState({
      rappel_total : this.formatMoney(rappel_t),
      rappel_antecipado : this.formatMoney(rappel_antecipado),
      parcela_rappel : this.formatMoney(parcela_rappel),
    })
  }

  handleSelectAutoComplete = async cnpj => {
    for (let i = 0; i < this.state.fornecedores.length; i++) {
      if (this.state.fornecedores[i].cnpj === cnpj) {
        await this.setState({
          selectedCNPJ: this.state.fornecedores[i].cnpj,
          selectedNome: this.state.fornecedores[i].nome_fornecedor,
          limite_1 : this.state.fornecedores[i].limite_1,
          limite_2 : this.state.fornecedores[i].limite_2,
          limite_3 : this.state.fornecedores[i].limite_3,
          limite_4 : this.state.fornecedores[i].limite_4,
          desconto_1 : this.state.fornecedores[i].desconto_1,
          desconto_2 : this.state.fornecedores[i].desconto_2,
          desconto_3 : this.state.fornecedores[i].desconto_3,
          desconto_4 : this.state.fornecedores[i].desconto_4,
          compras : this.state.fornecedores[i].compras,
          taxa_antecipacao : this.state.fornecedores[i].taxa_antecipacao,
          ultima_parcela_paga : this.state.fornecedores[i].ultima_parcela_paga,
          numero_parcelas_pagas : this.state.fornecedores[i].numero_parcelas_pagas,
          token : this.state.fornecedores[i].token,
        });

        if(this.compras <= this.limite_2){
          await this.setState({step : 1});
          await this.setState({taxa_alcancada : (this.state.desconto_1*100).toFixed(2)});
        }
        else if(this.compras >= this.limite_4){
          await this.setState({step : 3});
          await this.setState({taxa_alcancada : (this.state.desconto_4*100).toFixed(2)});
        }
        else{
          await this.setState({step : 2});
          let prop = (parseFloat(this.state.compras) - parseFloat(this.state.limite_2)) / (parseFloat(this.state.limite_3) - parseFloat(this.state.limite_2));
          console.log(prop);
          let taxa = parseFloat(this.state.desconto_2)/100 + parseFloat(prop) * (parseFloat(this.state.desconto_3)/100 - parseFloat(this.state.desconto_2)/100);
          console.log(taxa, this.state.desconto_2, this.state);
          await this.setState({taxa_alcancada : (taxa*100).toFixed(2)});
          
        }
        if(this.state.ultima_parcela_paga == null){
          this.setState({payment_enabled : true});
        }
        console.log(this.state);
        this.handleCalculateRappel();
        break;
      }
    }
    console.log(this.state);
  };

  handlePay = async () => {
    await axios
        .post('http://localhost:8000/pagamento', { input: this.state })
        .catch(error => {
          if (error.response.status == '400') {
            this.setState({ fail: true });
          }
        });
        if (this.state.fail) {
          document.getElementsByClassName('myAlert-top')[1].style.display = 'block';
          setTimeout(function() {
            if (typeof document.getElementsByClassName('myAlert-top')[1] !== 'undefined')
              document.getElementsByClassName('myAlert-top')[1].style.display = 'none';
            window.location.reload();
          }, 4000);
          this.setState({ fail: false });
        } else {
          document.getElementsByClassName('myAlert-top')[0].style.display = 'block';
          setTimeout(function() {
            if (typeof document.getElementsByClassName('myAlert-top')[0] !== 'undefined')
              document.getElementsByClassName('myAlert-top')[0].style.display = 'none';
            window.location.reload();
          }, 4000);
        }
  }

  render() {
    return (
      this.state.loading ? (
        <Loading />
      ) : (
      <div  className="container-fluid">
         <div style={{ display: 'none' }} class="myAlert-top alert alert-success ">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Sucesso!</strong> Pagamento foi processado e a partir de agora ocorrerá todo mês neste mesmo dia pelos próximos 12 meses.
          </div>
          <div style={{ display: 'none' }} class="myAlert-top alert alert-danger">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">
              &times;
            </a>
            <strong>Erro!</strong> Pagamento não processado e não agendado para próximos meses.
          </div>
        <Steps current={this.state.step}>
              <Step title="Faixa 1" description={`Até R$ ${this.formatMoney(this.state.limite_1)}`} />
              <Step
                title="Faixa 2"
                description={`De R$ ${this.formatMoney(this.state.limite_2)} até R$ ${this.formatMoney(this.state.limite_3)}`}
              />
              <Step title="Faixa 3" description={`A partir de R$ ${this.formatMoney(this.state.limite_4)}`} />
        </Steps>
        
         <Row>
          <AutoComplete
            style={{ width: 320 }}
            dataSource={this.state.dataSource}
            onSelect={this.handleSelectAutoComplete}
            onSearch={input => this.handleSearch(input)}
            placeholder="CNPJ"
          />
        </Row>
        <Row>
          {' '}
          <br />
        </Row>
        <Row>
          <p>Nome: {this.state.selectedNome}</p>
          <p>CNPJ: {this.state.selectedCNPJ}</p>
          <p>Compras: {this.formatMoney(this.state.compras)}</p>
          <p>Taxa Antecipação: {this.state.taxa_antecipacao}%</p>
          <p>Taxa Alcançada: {this.state.taxa_alcancada}%</p>
          <p>Rappel total: R${this.state.rappel_total}</p>
          <p>Rappel Antecipado: R${this.state.rappel_antecipado}</p>
          <p>Parcela Rappel: R${this.state.parcela_rappel}</p>
          {this.state.payment_enabled ? <Button onClick={() => {this.handlePay()}}>Agendar pagamento mensal</Button>
          : this.state.selectedCNPJ.length > 0 ? <div>
            <p> Pagamento mensal ja agendado para todo mês no dia{new Date(this.state.ultima_parcela_paga).getDay()}</p>
            <p> Número de parcelas remanescentes: {12-parseInt(this.state.numero_parcelas_pagas)}</p>
          </div> : ''}
        </Row>
      </div>
      )
    );
  }
}

export default (Rappel);
