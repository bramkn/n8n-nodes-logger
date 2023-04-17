import { IExecuteFunctions} from 'n8n-core';
import {
	IExecuteWorkflowInfo,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Logger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Logger',
		name: 'logger',
		group: ['transform'],
		version: 1,
		description: 'Logger Node to start a Logger Workflow',
		defaults: {
			name: 'Logger',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Logger Workflow ID',
				name: 'workflowId',
				type: 'string',
				default: '',
				description: 'ID of the Logger workflow',
			},
			{
				displayName: 'Items to be sent to the logger',
				name: 'itemsMode',
				type: 'options',
				options:[
					{
						name:'First Item',
						value:'firstItem'
					},
					{
						name:'All Items',
						value:'allItems'
					},
					{
						name:'1 Item with aggregated Item Value Arrays',
						value:'oneItemWithArray'
					},
				],
				default: '',
				description: 'Choose between modes of operation for the logger when sending items.',
			},
			{
				displayName: 'Values to Log',
				name: 'logValues',
				type: 'fixedCollection',
				placeholder: 'Add Log Value',
				typeOptions: {
					multipleValues:true,
					sortable:true,
					//multipleValueButtonText:'Add Log Value'
				},
				default: {},
				options: [
					{
						name:"logField",
						displayName:"Log Field",
						values:[
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Name of Log Value',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Log Value',
							},
						]
					}
				],
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. In this case, we're just appending the `myString` property
	// with whatever the user has entered.
	// You can make async calls and use `await`.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		//const executionId = this.getExecutionId();

			try {
				const workflowInfo: IExecuteWorkflowInfo = {};
				workflowInfo.id = this.getNodeParameter('workflowId', 0) as string;
				const workflowData = this.getWorkflow();
				const executionData = this.getExecuteData();
				console.log(executionData)
				const loggingData = [{json:{
					workflowId : workflowData.id,
					workflowName : workflowData.name,
					workflowIsActive : workflowData.active
				}}];
				console.log('execute logger workflow');
				await this.executeWorkflow(workflowInfo, loggingData);
			}
			catch (error) {
				throw new NodeOperationError(this.getNode(), error, {

				});
			}



		return this.prepareOutputData(items);
	}
}
