import Education from '../masters/education.json';
import Gender from '../masters/gender.json';
import Relationship from '../masters/relationship.json';
import Religion from '../masters/religion.json';

import City from './region/m_city.json';
import Country from './region/m_country.json';
import Province from './region/m_province.json';
import Regency from './region/m_regency.json';

export const ListRegion = {
  city: City.map((data: any) => {
    data.label = data.city_name;
    data.value = data.city_id;
    return data;
  }),
  country: Country.map((data: any) => {
    data.label = data.description;
    data.value = data.country_id;
    return data;
  }),
  province: Province.map((data: any) => {
    data.label = data.province_name;
    data.value = data.province_id;
    return data;
  }),
  regency: Regency.map((data: any) => {
    data.label = data.regency_name;
    data.value = data.regency_id;
    return data;
  })
};

export const MasterData = {
  Gender,
  Religion,
  Education,
  Relationship
};

export default MasterData;
