import React, { Component } from 'react'
import '../style.css'
import { connect } from 'react-redux'
import { filterBySparkling, filterByName, filterByColor, filterByTaste } from '../../AC'
// import cards from '../../reduce
import { WineAddPopup } from '../WineAddPopup/WineAddPopup'

interface IProps {
  filterBySparklingWines: (isChecked: boolean) => void,
  filterByNameProps: (nameLetter: string) => void,
  filterByColorProps: (color: string) => void,
  filterByTasteProps: (taste: string) => void,
}

interface IState {
  showPopup: boolean
}

class Filter extends Component<IProps, IState> {
  private testInput: React.RefObject<HTMLInputElement>
  constructor(porps: IProps) {
    super(porps)

    this.testInput = React.createRef()
    this.state = {
      showPopup: false
    }
  }

   public togglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  public render() {
    const { filterBySparklingWines, filterByNameProps, filterByColorProps, filterByTasteProps } = this.props
    return (
      <React.Fragment >
        <section className="selectors">
          <div className="color-selector">
            <label htmlFor="color-selector" className="visibility-hidden">
              Содержание сахара
                    </label>
            <select name="color-selector" id="color-selector" className="selectors-arrow"
              style={{ backgroundImage: `url(${require('../../img/icon-down-dir.svg')})` }}
              onChange={(e) => filterByColorProps(e.target.value)}
            >
              <option value="">цвет</option>
              <option value="red">красное</option>
              <option value="white">белое</option>
              <option value="rose">розовое</option>
            </select>
          </div>
          <div className="taste-selector" >
            <label htmlFor="taste-selector" className="visibility-hidden">
              Содержание сахара
                    </label>
            <select name="taste-selector" id="taste-selector" className="selectors-arrow"
              style={{ backgroundImage: `url(${require('../../img/icon-down-dir.svg')})` }}
              onChange={(e) => filterByTasteProps(e.target.value)}
            >
              <option value="">сладость / крепость</option>
              <option value="Сухое">сухое</option>
              <option value="Полусухое">полусухое</option>
              <option value="Полусладкое">полусладкое</option>
              <option value="Десертное полусладкое">десертное полусладкое</option>
              <option value="Десертное сладкое">десертное сладкое</option>
              <option value="Сладкое">сладкое</option>
              <option value="Ликерное">ликерное</option>
              <option value="Крепкое">крепкое</option>
            </select>
          </div>
          <div className="sparkling-selector">
            <input
              type="checkbox"
              name="sparkling-selector"
              id="sparkling-selector"
              value="Игристое"
              className="visibility-hidden"
              onChange={(e) => filterBySparklingWines(e.target.checked)}
            />
            <label htmlFor="sparkling-selector">
              игристое
                        <div className="checkbox-view" />
            </label>
          </div>
          <div className="name-selector" >
            <label htmlFor="search-string" className="visibility-hidden">
              Поиск по названию
                    </label>
            <input
              type="text"
              name="search-string"
              id="search-string"
              placeholder="Введите название вина"
              ref={this.testInput}
              onChange={(e) => filterByNameProps(e.target.value)}
            />
          </div>
          <button type="button" className="add-button" aria-label="добавить вино"
            onClick={this.togglePopup}
          >
            ДОБАВИТЬ
        </button>
        </section>
        {this.state.showPopup ? <WineAddPopup togglePopup={this.togglePopup} /> : null}
      </React.Fragment >
    )
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  filterBySparklingWines: (isChecked: boolean) => dispatch(filterBySparkling(isChecked)),
  filterByNameProps: (nameLetter: string) => dispatch(filterByName(nameLetter)),
  filterByColorProps: (color: string) => dispatch(filterByColor(color)),
  filterByTasteProps: (taste: string) => dispatch(filterByTaste(taste)),
})

/* const mapStateToProps = (state: any) => {
    return {isSparkling: state.isSparkling}
} */

export default connect(null, mapDispatchToProps)(Filter)
