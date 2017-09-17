import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { COLOR_LABEL_CATEGORY } from '../../constants/config';
import '../../../css/category/category.css';

export default class CategoryCard extends React.Component {
  constructor() {
    super();
    this.getCategorySum = this.getCategorySum.bind(this);
  }
  getCategorySum(issues) {
    const categoryList = [];
    const categoryHash = {};
    for (let i = 0; i < issues.length; i += 1) {
      const labels = issues[i].labels;
      for (let j = 0; j < labels.length; j += 1) {
        if (labels[j].color === COLOR_LABEL_CATEGORY) {
          const category = labels[j].name;
          if (categoryHash[category] === undefined) {
            categoryHash[category] = true;
            const categoryTemp = { category, sum: 1 };
            categoryList.push(categoryTemp);
          } else {
            for (let k = 0; k < categoryList.length; k += 1) {
              if (categoryList[k].category === category) {
                categoryList[k].sum += 1;
              }
            }
          }
        }
      }
    }
    return categoryList;
  }
  render() {
    const categoryList = this.getCategorySum(this.props.issues).map(item => <li key={item.category}>{item.category}<span>{item.sum}</span></li>);
    return (
      <div className="category-rightsider">
        <div className="category-rightsider-categorycard">
          <div className="category-rightsider-categorycard-title"><Icon type="bars" /> 统计</div>
          <div className="category-rightsider-categorycard-content">
            {categoryList}
          </div>
        </div>
      </div>
    );
  }
}

CategoryCard.defaultProps = {
  issues: null,
};

CategoryCard.propTypes = {
  issues: PropTypes.array,
};
