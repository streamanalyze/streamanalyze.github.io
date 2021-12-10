# Neural network functions:

> [function]
> maxi(Vector v)->Number i



___

> [function]
> minus(Tensor x,Tensor y)->Tensor



___

> [function]
> name(Sann)->Charstring

> [function-docs]
> The unique name of a Sann 



___

> [function]
> one_hot(Number size,Number i)->Vector of Number

> [function-docs]
> Create a vector of number of size `size` where index `i` is set to 1



___

> [function]
> one_hot_na(Number size,Number i)->Numarray

> [function-docs]
> Create a numarray of size `size` where index `i` is set to 1



___

> [function]
> plus(Tensor x,Tensor y)->Tensor



___

> [function]
> sann:bind_tensor(Sann sann,Number index,Numarray values)->Boolean

> [function-docs]
> Bind `values` to tensor with index `index` in network `sann`



___

> [function]
> sann:bind_tensor(Sann sann,Number index,Vector of Number values)->Boolean

> [function-docs]
> Bind `values` to tensor with index `index` in network `sann`



___

> [function]
> sann:classify(Sann k,Vector of Numarray observation)->Vector of Real

> [function-docs]
> Classifies an `observation` based on the Sann-network `k` 



___

> [function]
> sann:classify(Sann k,Matrix observation)->Vector of Real

> [function-docs]
> Classifies an `observation` based on the Sann-network `k` 



___

> [function]
> sann:classify(Sann k,Numarray observation)->Vector of Real

> [function-docs]
> Classifies an `observation` based on the Sann-network `k` 



___

> [function]
> sann:classify(Sann k,Vector of Number observation)->Vector of Real

> [function-docs]
> Classifies an `observation` based on the Sann-network `k` 



___

> [function]
> sann:download(Charstring name)->Charstring

> [function-docs]
> Download the Sann identified by `name` from edge server 



___

> [function]
> sann:ff_trainer(Sann k,Real learning_rate,Integer max_iterations,
               Integer stop_iterations,Real validation_fraction,
               Stream of Vector of Vector data)->Stream of Record

> [function-docs]
> Feed-forward training of a sann.
>      `learning_rate` The rate at which the weights in the network are updated.
>      `max_iterations` Maximum number of iterations over a batch
>      `stop_iterations` Stop iterations over current batch if performance has
>                       decreased `stop_iterations` times in a row.
>      `validation_fraction` Fraction of data to use as validation when training.
>      `data` Training data 



___

> [function]
> sann:get(Sann k,Integer index)->Tensor



___

> [function]
> sann:import(Charstring name,Charstring folder)->Sann

> [function-docs]
> Import exported Sann model in `folder` and name it `name` 



___

> [function]
> sann:import(Charstring name)->Sann

> [function-docs]
> Import exported Sann model in folder `name` 



___

> [function]
> sann:layer_conv2d(Tensor k,Integer n_flt,Integer kernel_height,
                 Integer kernel_width,Integer row_stride,Integer column_stride,
                 Integer row_padding,Integer column_padding)->Tensor



___

> [function]
> sann:layer_dense(Tensor k,Integer num_neurons)->Tensor

> [function-docs]
> Add a hidden layer with `num_neurons` in to the networks `k`.



___

> [function]
> sann:layer_dropout(Tensor k,Number dropout)->Tensor



___

> [function]
> sann:layer_input(Integer num_inputs)->Tensor



___

> [function]
> sann:mc_acc(Sann network,Charstring test_file)->Number

> [function-docs]
> Compute the accuracy of a Sann `network` using a test set in 
>      the CSV file `test_file` where each row has the format:
>      `row:class,o1,o2,...` and
>      `row` is key of the row, 
>      `class` is the id of the expected class enumerated as an integer from 0 and
>              up, and
>      `o1,o2,...` is a vector of observed values for the class.
>   



___

> [function]
> sann:mc_acc(Sann network,Charstring test_file,Number num_observations)->Number

> [function-docs]
> Compute the accuracy of a Sann `network` using a test set in 
>      the CSV file `test_file` where each row has the format:
>      `row:class,o1,o2,...` and
>      `row` is key of the row, 
>      `class` is the id of the expected class enumerated as an integer from 0 and
>              up, 
>      `o1,o2,...` is a vector of observed values for the class, and
>      `num_observations` is the number of rows to read from the `test_file`.
>   



___

> [function]
> sann:mc_train_stream(Charstring filename,Integer classes)->Stream of Vector

> [function-docs]
> Returns a stream of trainng pairs `[Vector expected, observation]` 
>      from each row in a CSV training file `filename`
>      where each row has the format:
>      `row:class,o1,o2,...` and
>      `row` is key of the row, 
>      `class` is the id of the expected class enumerated as an integer from 0 to 
>              `classes-1`
>      `o1,o2,...` is a vector of observed values for the class
>   



___

> [function]
> sann:mlp_gen(Charstring name,Integer input_dimension,Integer output_dimension,
            Integer costfn,Integer layers,Integer hidden_dimensions,
            Integer random_seed,Charstring activationfn)->Sann

> [function-docs]
> Generates a Multi Layerered Perceptron network 



___

> [function]
> sann:mlp_gen(Charstring name,Integer input_dimension,Integer output_dimension,
            Integer costfn,Integer layers,Integer hidden_dimensions,
            Integer random_seed)->Sann

> [function-docs]
> Generates a Multi Layerered Perceptron network 



___

> [function]
> sann:named(Charstring name)->Sann s

> [function-docs]
> Get the Sann identified by `name` 



___

> [function]
> sann:new_bias(Integer n)->Tensor



___

> [function]
> sann:new_weight(Integer row_count,Integer column_count)->Tensor



___

> [function]
> sann:new_weight_conv1d(Integer n_out,Integer n_in,Integer kernel_length)->Tensor



___

> [function]
> sann:new_weight_conv2d(Integer n_out,Integer n_in,Integer kernel_rows,
                      Integer kernel_columns)->Tensor



___

> [function]
> sann:print(Sann k)->Boolean



___

> [function]
> sann:read(Charstring name,Charstring file)->Sann

> [function-docs]
> Reads a Sann-netword from a `file` 



___

> [function]
> sann:read_csv_file(Charstring filename)->Bag of (Vector,Numarray)

> [function-docs]
> See sann:train_stream of usage example 



___

> [function]
> sann:rnn_end(Sann sann)->Boolean



___

> [function]
> sann:rnn_rand(Sann sann)->Boolean



___

> [function]
> sann:rnn_start(Sann sann)->Boolean



___

> [function]
> sann:rnn_trainer(Sann sann,Number learning_rate,Number grad_clip,
                Stream of Vector of Vector data)->Stream of Record

> [function-docs]
> Training of an RNN sann. The trainer will unroll the network based on the
> size of the windows in data.
>   `sann` The sann network to train.
>   `learning_rate` The rate at which the weights in the network are updated.
>   `data` Stream of training data. Each Vector of Vector must have the format
>         `[[<truth>, <observation>]]`. Both `truth` and `observation` may have 
>         the type `Vector of Number` or `Numarray` 
> 



___

> [function]
> sann:run_model(Tensor model,Vector of Tensor vars,Matrix params)->Bag of Number

> [function-docs]
>



___

> [function]
> sann:run_model(Tensor model,Vector of Integer labels,Matrix params)
              ->Bag of Number



___

> [function]
> sann:send_to_peer(Charstring peer,Sann s)->Charstring

> [function-docs]
> Send Sann `s` to `peer` 



___

> [function]
> sann:srand(Integer seed)->Boolean

> [function-docs]
> Seed the neural network random generator with seed `seed`, good when testing
>  neural networks to get consistent results 



___

> [function]
> sann:structure(Sann k)->Vector of Record



___

> [function]
> sann:structure_str(Sann k)->Bag of Charstring



___

> [function]
> sann:test(Sann s,Matrix x,Matrix y)->Number



___

> [function]
> sann:train_stream(Charstring filename,Integer truth_tag_index,
                 Integer truth_size)->Stream of Vector

> [function-docs]
> Returns a stream of [Vector truth, observation] from a csv file where each 
>      row's first element is a tag on the format x:y:z and truth_tag_index is the
>      index of the truth label in the tag.
>   



___

> [function]
> sann:tree(Sann k)->Record

> [function-docs]
> Creates a tree structure of the network. Call this function on a sann
>    in the visual analyzer with `automatic` as visualization to get a graph
>    visualization of the network 



___

> [function]
> sann:write(Sann k,Charstring file)->Charstring

> [function-docs]
> Saves Sann-network `k` in `file` 



___

> [function]
> sann_layer_cost(Tensor k,Integer number_of_outputs,Integer costfn)->Tensor

> [function-docs]
> Add a final cost layer to network `k` This function must be called
>      at least once befure calling sann_new
>      `k`: tensor to apply cost function on.
>      `number_of_outputs`: size of the output of the cost layer.
>      `costfn`: Type of cost function to use, it can be the following values:
>               `1`: Binary cross-entropy, used with sigmoid.
>               `2`: Multi-class cross-entropy, used with softmax.
>               `3`: Binary cross-entropy negative, used with tanh.
>               `4`: Mean square error 



___

> [function]
> spaces(Number n)->Charstring



___

> [function]
> tensor:assign(Tensor var,Vector of Number val)->Vector of Number



___

> [function]
> tensor:assign(Tensor root,Integer ext_label,Vector of Number vals)
             ->Vector of Number



___

> [function]
> tensor:clear_flag(Tensor node,Integer flag)->Tensor



___

> [function]
> tensor:compile(Charstring name,Tensor k)->Sann

> [function-docs]
> Creates and returns a new Sann object, ready to be trained.



___

> [function]
> tensor:const(Vector of Integer dimensions,Vector of Number val)->Tensor

> [function-docs]
> Create a constant tensor.
>      If the product of all dimensions is larger than dim(val) then the const 
>      layer will be filles with val[0] 



___

> [function]
> tensor:conv2d(Tensor k,Tensor weights,Integer row_stride,Integer column_stride,
             Integer row_padding,Integer column_padding)->Tensor



___

> [function]
> tensor:eval(Tensor k)->Vector of Number



___

> [function]
> tensor:feed(Vector of Number shape,Integer t)->Tensor

> [function-docs]
> Create a tensor of type `t` with shape `shape`
>      `shape`: `Vector of Number` with up to 4 dimensions that determines the
>               shape of the tensor.
>      `t`: `Integer` that sets the type of the feed it can have the following
>           values:
>       `1`: Input feed, the input of a network. 
>       `2`: Output feed, the output of a network.
>       `3`: Truth feed, used as one of the inputs to a cost function 
>            when training a network.
>   



___

> [function]
> tensor:find(Tensor root,Integer ext_label)->Tensor



___

> [function]
> tensor:max2d(Tensor k,Integer kernel_height,Integer kernel_width,
            Integer row_stride,Integer column_stride,Integer row_padding,
            Integer column_padding)->Tensor



___

> [function]
> tensor:op1(Charstring op,Tensor node)->Tensor

> [function-docs]
> `op` can be: 
>      `log`      f(x) = log(x)
>      `exp`      f(x) = exp(x)
>      `sin`      f(x) = sin(x)
>      `square`   f(x) = x^2 
>      `sigm`     f(x) = e^x/(e^x +1) sigmoid
>      `tanh`     f(x) = tanh(x)
>      `relu`     f(x) = max(0,x) ReLU
>      `1minus`   f(x) = 1-x
>      `softmax`  softmax https://en.wikipedia.org/wiki/Softmax_function
>      `stdnorm`  layer normalization
>    



___

> [function]
> tensor:op2(Charstring op,Tensor x,Tensor y)->Tensor

> [function-docs]
> `op` can be: 
>      `add`         f(x,y) = x + y
>      `sub`         f(x,y) = x - y             
>      `mul`         f(x,y) = x .* y
>      `matmul`      matrix multiplication
>      `cmul`        column multiplication
>      `ce_bin_neg`  binary cross-entropy for (-1, 1)
>      `ce_multi`    multi-class cross-entropy
>      `ce_bin`      binary cross-entropy for (0,1)
>   



___

> [function]
> tensor:placeholder(Vector of Integer shape)->Tensor

> [function-docs]
> Ctreate a placeholder tensor with shape `shape`
>      `shape`: Vector of max 4 dimensions defining the shape of the tensor.



___

> [function]
> tensor:print(Tensor k)->Tensor



___

> [function]
> tensor:reduce_mean(Tensor x,Integer axis)->Tensor



___

> [function]
> tensor:reduce_sum(Tensor x,Integer axis)->Tensor



___

> [function]
> tensor:reshape(Tensor k,Vector of Number shape)->Tensor



___

> [function]
> tensor:set_flag(Tensor node,Integer flag)->Tensor



___

> [function]
> tensor:set_label(Tensor node,Integer label)->Tensor



___

> [function]
> tensor:size(Tensor k)->Integer



___

> [function]
> tensor:var(Vector of Integer dimensions,Vector of Number vals,
          Vector of Number gradients)->Tensor

> [function-docs]
> Create a variable tensor.
> `dimensions` vector of a maximum size 4 with sizes for each dimension.
> `vals` values for the tensor
> `gradients` gradients of tensor, if unsure how to use, set to `[0]` 



___

> [function]
> truth_vec(Number size,Number truth)->Vector of Number

> [function-docs]
> Create a vector of number of size `size` where index `truth` is set to 1 



___

> [function]
> vec2numarray(Vector v)->Numarray

> [function-docs]
> Convert `v` to numarray. 


