/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDonationItemPairs = /* GraphQL */ `
  mutation CreateDonationItemPairs(
    $input: CreateDonationItemPairsInput!
    $condition: ModelDonationItemPairsConditionInput
  ) {
    createDonationItemPairs(input: $input, condition: $condition) {
      id
      virtualItemId
      physicalItemId
      projectId
      createdAt
      updatedAt
    }
  }
`;
export const updateDonationItemPairs = /* GraphQL */ `
  mutation UpdateDonationItemPairs(
    $input: UpdateDonationItemPairsInput!
    $condition: ModelDonationItemPairsConditionInput
  ) {
    updateDonationItemPairs(input: $input, condition: $condition) {
      id
      virtualItemId
      physicalItemId
      projectId
      createdAt
      updatedAt
    }
  }
`;
export const deleteDonationItemPairs = /* GraphQL */ `
  mutation DeleteDonationItemPairs(
    $input: DeleteDonationItemPairsInput!
    $condition: ModelDonationItemPairsConditionInput
  ) {
    deleteDonationItemPairs(input: $input, condition: $condition) {
      id
      virtualItemId
      physicalItemId
      projectId
      createdAt
      updatedAt
    }
  }
`;
export const createDonorItem = /* GraphQL */ `
  mutation CreateDonorItem(
    $input: CreateDonorItemInput!
    $condition: ModelDonorItemConditionInput
  ) {
    createDonorItem(input: $input, condition: $condition) {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const updateDonorItem = /* GraphQL */ `
  mutation UpdateDonorItem(
    $input: UpdateDonorItemInput!
    $condition: ModelDonorItemConditionInput
  ) {
    updateDonorItem(input: $input, condition: $condition) {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const deleteDonorItem = /* GraphQL */ `
  mutation DeleteDonorItem(
    $input: DeleteDonorItemInput!
    $condition: ModelDonorItemConditionInput
  ) {
    deleteDonorItem(input: $input, condition: $condition) {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const createDonationAppointmentProposal = /* GraphQL */ `
  mutation CreateDonationAppointmentProposal(
    $input: CreateDonationAppointmentProposalInput!
    $condition: ModelDonationAppointmentProposalConditionInput
  ) {
    createDonationAppointmentProposal(input: $input, condition: $condition) {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const updateDonationAppointmentProposal = /* GraphQL */ `
  mutation UpdateDonationAppointmentProposal(
    $input: UpdateDonationAppointmentProposalInput!
    $condition: ModelDonationAppointmentProposalConditionInput
  ) {
    updateDonationAppointmentProposal(input: $input, condition: $condition) {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const deleteDonationAppointmentProposal = /* GraphQL */ `
  mutation DeleteDonationAppointmentProposal(
    $input: DeleteDonationAppointmentProposalInput!
    $condition: ModelDonationAppointmentProposalConditionInput
  ) {
    deleteDonationAppointmentProposal(input: $input, condition: $condition) {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const createToken = /* GraphQL */ `
  mutation CreateToken(
    $input: CreateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    createToken(input: $input, condition: $condition) {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const updateToken = /* GraphQL */ `
  mutation UpdateToken(
    $input: UpdateTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    updateToken(input: $input, condition: $condition) {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const deleteToken = /* GraphQL */ `
  mutation DeleteToken(
    $input: DeleteTokenInput!
    $condition: ModelTokenConditionInput
  ) {
    deleteToken(input: $input, condition: $condition) {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
