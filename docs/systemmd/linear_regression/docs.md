# Linear regression

This model implements multiple linear regression. It can both estimate given weights and train a model given a dataset. The training is done using *Gradient descent*. The following functions implement linear regression:

- `new_lr_model(Charstring name,Vector of Number ind_vars,Number predict_index, Vector of Number starting_weights)->Object`
- `linear_regression(Charstring model,Vector of Vector dataset, Number learning_rate,Number max_iteration)->Record`
- `lr_estimate(Charstring model,Vector of Number input)->Number`

The functions take care of storing the weights obtained during training and calculating the R-square of the model during training.

```LIVE {"vis":"automatic"}
{"sa_plot": "Text"};
set :s = (select vector of v
            from Vector v
           where v in csv:file_stream(system_model_folder("linear_regression")+
                                      "test/linear_reg2.csv"));
set :v = linear_regression(:s,0.0000001,100,[1],2);
set :a = :v[1];
:v;

{"sa_plot": "Scatter plot", "color_axis": 4};
select vector of y
           from Vector of Number v, Vector of Number y
          where v in :s
            and y =  [v[1], lr_estimate(:a,permute(v,[1])),2,2]
             or v in :s
            and y = concat(v,[2,1]);
```