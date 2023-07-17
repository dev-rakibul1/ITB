'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicDepartmentService = void 0;
const paginationHelpers_1 = require('../../../helpers/paginationHelpers');
const academicDepartment_constants_1 = require('./academicDepartment.constants');
const academicDepartment_model_1 = require('./academicDepartment.model');
const createAcademicDepartmentService = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield academicDepartment_model_1.AcademicDepartment.create(
      payload
    )).populate('academicFaculty');
    return result;
  });
const getAllAcademicDepartmentService = (filters, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // search stream
    const { searchTerm } = filters,
      searchTermData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: academicDepartment_constants_1.academicDepartmentSearchKeys.map(
          field => ({
            [field]: {
              $regex: searchTerm,
              $options: 'i',
            },
          })
        ),
      });
    }
    if (Object.keys(searchTermData).length) {
      andConditions.push({
        $and: Object.entries(searchTermData).map(([fields, value]) => ({
          [fields]: value,
        })),
      });
    }
    // pagination sort
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers_1.paginationHelper.paginationCalculation(payload);
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length ? { $and: andConditions } : {};
    const result = yield academicDepartment_model_1.AcademicDepartment.find(
      whereConditions
    )
      .populate('academicFaculty')
      .sort(sortConditions)
      .limit(limit)
      .skip(skip);
    const total =
      yield academicDepartment_model_1.AcademicDepartment.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const updateAcademicDepartmentService = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield academicDepartment_model_1.AcademicDepartment.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
        }
      );
    return result;
  });
const deleteAcademicDepartmentService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const deleteDepartment =
      yield academicDepartment_model_1.AcademicDepartment.findByIdAndDelete(
        id
      ).populate('academicFaculty');
    return deleteDepartment;
  });
const getSingleAcademicDepartmentService = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const singleDepartment =
      yield academicDepartment_model_1.AcademicDepartment.findById(id).populate(
        'academicFaculty'
      );
    return singleDepartment;
  });
exports.academicDepartmentService = {
  createAcademicDepartmentService,
  getAllAcademicDepartmentService,
  updateAcademicDepartmentService,
  deleteAcademicDepartmentService,
  getSingleAcademicDepartmentService,
};
